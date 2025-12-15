/**
 * Demo Page Component
 * Public page showing live queue demonstration with mock real-time updates
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockClinics, mockQueue, getDoctorForClinic, Clinic, QueueEntry } from '@/data/mockData';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import PriorityBadge from '@/components/PriorityBadge';
import { Heart, Bone, Baby, Stethoscope, Users, Clock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping for clinics
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart: Heart,
  Bone: Bone,
  Baby: Baby,
};

const Demo: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  // State for simulating real-time updates
  const [clinics, setClinics] = useState<Clinic[]>([...mockClinics]);
  const [queues, setQueues] = useState<QueueEntry[]>([...mockQueue]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update queue numbers to simulate activity
      setClinics(prev => prev.map(clinic => ({
        ...clinic,
        currentQueueNumber: clinic.currentQueueNumber + (Math.random() > 0.7 ? 1 : 0),
        totalServed: clinic.totalServed + (Math.random() > 0.5 ? 1 : 0),
        status: Math.random() > 0.2 
          ? (Math.random() > 0.3 ? 'available' : 'busy') 
          : clinic.status,
      })));
      
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get queue for a specific clinic
  const getClinicQueue = (clinicId: string): QueueEntry[] => {
    return queues
      .filter(q => q.clinicId === clinicId && q.status !== 'done' && q.status !== 'cancelled')
      .slice(0, 3); // Show only first 3 for demo
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t.demoTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.demoSubtitle}
          </p>
          
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span className="text-sm text-muted-foreground">
              Live • Last update: {formatTime(lastUpdate)}
            </span>
            <RefreshCw className="h-4 w-4 text-muted-foreground animate-spin-slow" />
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {clinics.map((clinic) => {
            const doctor = getDoctorForClinic(clinic.id);
            const IconComponent = iconMap[clinic.icon] || Stethoscope;
            const clinicQueue = getClinicQueue(clinic.id);

            return (
              <Card 
                key={clinic.id}
                className={cn(
                  'overflow-hidden transition-all duration-300 hover:shadow-lg',
                  clinic.status === 'available' && 'border-success/30',
                  clinic.status === 'busy' && 'border-warning/30'
                )}
              >
                {/* Clinic Header */}
                <CardHeader className={cn(
                  'pb-4',
                  clinic.status === 'available' && 'bg-success/5',
                  clinic.status === 'busy' && 'bg-warning/5'
                )}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'p-3 rounded-xl',
                        clinic.status === 'available' ? 'bg-success/10' : 'bg-warning/10'
                      )}>
                        <IconComponent className={cn(
                          'h-6 w-6',
                          clinic.status === 'available' ? 'text-success' : 'text-warning'
                        )} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {isRTL ? clinic.nameAr : clinic.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? clinic.descriptionAr : clinic.description}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={clinic.status} size="sm" />
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Doctor Info */}
                  {doctor && (
                    <div className="flex items-center gap-2 py-3 border-b border-border">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {isRTL ? doctor.nameAr : doctor.name}
                      </span>
                    </div>
                  )}

                  {/* Current Queue Display */}
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="text-center p-3 rounded-lg bg-primary/5">
                      <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-2xl font-bold text-primary">
                        #{clinic.currentQueueNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.currentQueue}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted">
                      <Clock className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                      <p className="text-2xl font-bold text-foreground">
                        ~{clinic.averageWaitTime}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.minutes}</p>
                    </div>
                  </div>

                  {/* Queue List Preview */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {t.queueList}:
                    </p>
                    {clinicQueue.length > 0 ? (
                      clinicQueue.map((entry, index) => (
                        <div 
                          key={entry.id}
                          className={cn(
                            'flex items-center justify-between p-2 rounded-lg transition-all',
                            index === 0 && 'bg-success/10 border border-success/30',
                            index === 1 && 'bg-warning/10 border border-warning/30',
                            index > 1 && 'bg-muted'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                              index === 0 && 'bg-success text-success-foreground',
                              index === 1 && 'bg-warning text-warning-foreground',
                              index > 1 && 'bg-muted-foreground/20 text-muted-foreground'
                            )}>
                              #{entry.queueNumber}
                            </span>
                            <span className="text-sm">
                              {isRTL ? entry.patientNameAr : entry.patientName}
                            </span>
                          </div>
                          <PriorityBadge priority={entry.priority} size="sm" showIcon={false} />
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        {t.noPatients}
                      </p>
                    )}
                  </div>

                  {/* Stats Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border text-sm text-muted-foreground">
                    <span>{t.totalServedToday}: {clinic.totalServed}</span>
                    <span>~{clinic.averageWaitTime} {t.minutes}/patient</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Demo Note */}
        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-muted-foreground">
            📌 This is a demo with simulated real-time updates. 
            In a production environment, this would connect to a live database.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
