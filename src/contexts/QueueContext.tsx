/**
 * Queue Context Provider
 * Manages queue state with smart queue logic
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  QueueEntry, 
  Clinic, 
  mockQueue, 
  mockClinics, 
  getQueueForClinic, 
  getPatientQueueEntry,
  getPatientsBeforeCount,
  Priority,
  QueueStatus
} from '@/data/mockData';

interface QueueContextType {
  queues: QueueEntry[];
  clinics: Clinic[];
  joinQueue: (patientId: string, patientName: string, patientNameAr: string, clinicId: string, priority: Priority) => QueueEntry | null;
  leaveQueue: (queueId: string) => void;
  callNextPatient: (clinicId: string) => QueueEntry | null;
  markPatientDone: (queueId: string) => void;
  getClinicQueue: (clinicId: string) => QueueEntry[];
  getPatientQueue: (patientId: string, clinicId?: string) => QueueEntry | undefined;
  getWaitingCount: (queueEntry: QueueEntry) => number;
  refreshQueues: () => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

interface QueueProviderProps {
  children: ReactNode;
}

export const QueueProvider: React.FC<QueueProviderProps> = ({ children }) => {
  const [queues, setQueues] = useState<QueueEntry[]>([...mockQueue]);
  const [clinics, setClinics] = useState<Clinic[]>([...mockClinics]);

  /**
   * Simulate real-time queue updates
   * Updates queue positions and estimated wait times periodically
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setQueues(prevQueues => {
        return prevQueues.map(entry => {
          // Update estimated wait time based on position
          if (entry.status === 'waiting') {
            const clinic = clinics.find(c => c.id === entry.clinicId);
            const queuePosition = getQueueForClinic(entry.clinicId).findIndex(e => e.id === entry.id);
            const newEstimate = Math.max(0, queuePosition * (clinic?.averageWaitTime || 15));
            return { ...entry, estimatedWaitTime: newEstimate };
          }
          return entry;
        });
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [clinics]);

  /**
   * Join queue - adds patient to clinic queue
   * Implements priority-based positioning
   */
  const joinQueue = useCallback((
    patientId: string, 
    patientName: string, 
    patientNameAr: string,
    clinicId: string, 
    priority: Priority
  ): QueueEntry | null => {
    // Check if patient already in queue for this clinic
    const existing = queues.find(q => 
      q.patientId === patientId && 
      q.clinicId === clinicId && 
      q.status !== 'done' && 
      q.status !== 'cancelled'
    );
    
    if (existing) {
      return null; // Already in queue
    }

    // Get clinic info for queue number calculation
    const clinic = clinics.find(c => c.id === clinicId);
    if (!clinic) return null;

    // Calculate new queue number
    const clinicQueue = queues.filter(q => 
      q.clinicId === clinicId && 
      q.status !== 'cancelled'
    );
    const maxQueueNumber = clinicQueue.length > 0 
      ? Math.max(...clinicQueue.map(q => q.queueNumber))
      : clinic.currentQueueNumber;
    
    const newQueueNumber = maxQueueNumber + 1;

    // Calculate estimated wait time
    const waitingCount = clinicQueue.filter(q => 
      q.status === 'waiting' || q.status === 'almost'
    ).length;
    const estimatedWait = waitingCount * clinic.averageWaitTime;

    // Create new queue entry
    const newEntry: QueueEntry = {
      id: `q-${Date.now()}`,
      patientId,
      patientName,
      patientNameAr,
      clinicId,
      queueNumber: newQueueNumber,
      priority,
      status: 'waiting',
      checkInTime: new Date(),
      estimatedWaitTime: estimatedWait,
    };

    setQueues(prev => [...prev, newEntry]);

    // Update clinic current queue number
    setClinics(prev => prev.map(c => 
      c.id === clinicId 
        ? { ...c, currentQueueNumber: Math.max(c.currentQueueNumber, newQueueNumber) }
        : c
    ));

    return newEntry;
  }, [queues, clinics]);

  /**
   * Leave queue - removes patient from queue
   */
  const leaveQueue = useCallback((queueId: string) => {
    setQueues(prev => prev.map(entry => 
      entry.id === queueId 
        ? { ...entry, status: 'cancelled' as QueueStatus }
        : entry
    ));
  }, []);

  /**
   * Call next patient - moves next patient to serving status
   * Prioritizes urgent patients
   */
  const callNextPatient = useCallback((clinicId: string): QueueEntry | null => {
    const clinicQueue = getQueueForClinic(clinicId);
    
    // Find next patient (urgent first, then by queue number)
    const waitingPatients = clinicQueue.filter(e => 
      e.status === 'waiting' || e.status === 'almost'
    );

    if (waitingPatients.length === 0) return null;

    // Sort: urgent first, then by check-in time
    waitingPatients.sort((a, b) => {
      if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
      if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
      return a.checkInTime.getTime() - b.checkInTime.getTime();
    });

    const nextPatient = waitingPatients[0];

    // Update queue statuses
    setQueues(prev => prev.map(entry => {
      if (entry.id === nextPatient.id) {
        return { ...entry, status: 'serving' as QueueStatus, estimatedWaitTime: 0 };
      }
      // Mark current serving as done
      if (entry.clinicId === clinicId && entry.status === 'serving') {
        return { ...entry, status: 'done' as QueueStatus };
      }
      // Update "almost" status for next in line
      if (entry.clinicId === clinicId && entry.status === 'waiting') {
        const pos = waitingPatients.findIndex(w => w.id === entry.id);
        if (pos === 1) {
          return { ...entry, status: 'almost' as QueueStatus };
        }
      }
      return entry;
    }));

    // Update clinic stats
    setClinics(prev => prev.map(c => 
      c.id === clinicId 
        ? { ...c, totalServed: c.totalServed + 1 }
        : c
    ));

    return nextPatient;
  }, []);

  /**
   * Mark patient as done - completes patient service
   */
  const markPatientDone = useCallback((queueId: string) => {
    setQueues(prev => {
      const entry = prev.find(e => e.id === queueId);
      if (!entry) return prev;

      return prev.map(e => {
        if (e.id === queueId) {
          return { ...e, status: 'done' as QueueStatus };
        }
        // Update next waiting patient to "almost"
        if (e.clinicId === entry.clinicId && e.status === 'waiting') {
          const clinicQueue = getQueueForClinic(entry.clinicId);
          const nextWaiting = clinicQueue.find(q => q.status === 'waiting');
          if (nextWaiting && nextWaiting.id === e.id) {
            return { ...e, status: 'almost' as QueueStatus };
          }
        }
        return e;
      });
    });
  }, []);

  /**
   * Get queue for specific clinic
   */
  const getClinicQueue = useCallback((clinicId: string): QueueEntry[] => {
    return queues
      .filter(entry => 
        entry.clinicId === clinicId && 
        entry.status !== 'done' && 
        entry.status !== 'cancelled'
      )
      .sort((a, b) => {
        // Sort by status priority, then by queue number
        const statusOrder = { serving: 0, almost: 1, waiting: 2 };
        const statusDiff = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
        if (statusDiff !== 0) return statusDiff;
        
        // Then by priority (urgent first)
        if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
        if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
        
        return a.queueNumber - b.queueNumber;
      });
  }, [queues]);

  /**
   * Get patient's queue entry
   */
  const getPatientQueue = useCallback((patientId: string, clinicId?: string): QueueEntry | undefined => {
    return queues.find(entry => 
      entry.patientId === patientId && 
      entry.status !== 'done' && 
      entry.status !== 'cancelled' &&
      (!clinicId || entry.clinicId === clinicId)
    );
  }, [queues]);

  /**
   * Get number of patients waiting before a specific entry
   */
  const getWaitingCount = useCallback((queueEntry: QueueEntry): number => {
    const clinicQueue = getClinicQueue(queueEntry.clinicId);
    const position = clinicQueue.findIndex(entry => entry.id === queueEntry.id);
    return Math.max(0, position);
  }, [getClinicQueue]);

  /**
   * Refresh queues from mock data
   */
  const refreshQueues = useCallback(() => {
    setQueues([...mockQueue]);
    setClinics([...mockClinics]);
  }, []);

  return (
    <QueueContext.Provider value={{
      queues,
      clinics,
      joinQueue,
      leaveQueue,
      callNextPatient,
      markPatientDone,
      getClinicQueue,
      getPatientQueue,
      getWaitingCount,
      refreshQueues,
    }}>
      {children}
    </QueueContext.Provider>
  );
};

// Custom hook to use queue context
export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
