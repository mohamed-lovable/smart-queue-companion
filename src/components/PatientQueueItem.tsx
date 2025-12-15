/**
 * Patient Queue Item Component
 * Displays a patient in the queue list
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QueueEntry } from '@/data/mockData';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { cn } from '@/lib/utils';
import { User, Clock } from 'lucide-react';

interface PatientQueueItemProps {
  entry: QueueEntry;
  isCurrentPatient?: boolean;
  onClick?: () => void;
}

const PatientQueueItem: React.FC<PatientQueueItemProps> = ({
  entry,
  isCurrentPatient = false,
  onClick,
}) => {
  const { isRTL, t } = useLanguage();

  // Format check-in time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all duration-200',
        isCurrentPatient 
          ? 'bg-primary/10 border-primary shadow-md' 
          : 'bg-card border-border hover:border-primary/50 hover:shadow-sm',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Queue Number & Patient Info */}
        <div className="flex items-center gap-4">
          {/* Queue Number */}
          <div className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold',
            isCurrentPatient 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          )}>
            #{entry.queueNumber}
          </div>

          {/* Patient Info */}
          <div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {isRTL ? entry.patientNameAr : entry.patientName}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatTime(entry.checkInTime)}</span>
            </div>
          </div>
        </div>

        {/* Right: Badges */}
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={entry.status} size="sm" animated />
          <PriorityBadge priority={entry.priority} size="sm" />
        </div>
      </div>

      {/* Estimated wait time (for waiting patients) */}
      {entry.status === 'waiting' && entry.estimatedWaitTime > 0 && (
        <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
          {t.estimatedWait}: ~{entry.estimatedWaitTime} {t.minutes}
        </div>
      )}
    </div>
  );
};

export default PatientQueueItem;
