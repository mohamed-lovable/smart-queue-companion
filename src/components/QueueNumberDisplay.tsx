/**
 * Queue Number Display Component
 * Large, prominent display of queue number
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QueueStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';

interface QueueNumberDisplayProps {
  queueNumber: number;
  status: QueueStatus;
  patientsBeforeYou?: number;
  estimatedWait?: number;
}

const QueueNumberDisplay: React.FC<QueueNumberDisplayProps> = ({
  queueNumber,
  status,
  patientsBeforeYou = 0,
  estimatedWait = 0,
}) => {
  const { t } = useLanguage();

  // Get background style based on status
  const getBgStyle = () => {
    switch (status) {
      case 'serving':
        return 'bg-success/10 border-success';
      case 'almost':
        return 'bg-warning/10 border-warning animate-pulse-queue';
      default:
        return 'bg-primary/5 border-primary/20';
    }
  };

  return (
    <div className={cn(
      'rounded-2xl border-2 p-8 text-center transition-all duration-300',
      getBgStyle()
    )}>
      {/* Queue Number */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">{t.myQueueNumber}</p>
        <div className="text-7xl font-bold text-primary">
          #{queueNumber}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <StatusBadge status={status} size="lg" animated />
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">{t.patientsBeforeYou}</p>
          <p className="text-2xl font-bold text-foreground">{patientsBeforeYou}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{t.estimatedWait}</p>
          <p className="text-2xl font-bold text-foreground">
            {estimatedWait} <span className="text-sm font-normal">{t.minutes}</span>
          </p>
        </div>
      </div>

      {/* Status Message */}
      {status === 'almost' && (
        <div className="mt-4 p-3 bg-warning/20 rounded-lg text-warning-foreground text-sm font-medium">
          🔔 {t.yourTurnSoon}
        </div>
      )}
      {status === 'serving' && (
        <div className="mt-4 p-3 bg-success/20 rounded-lg text-success text-sm font-medium">
          ✅ {t.yourTurnNow}
        </div>
      )}
    </div>
  );
};

export default QueueNumberDisplay;
