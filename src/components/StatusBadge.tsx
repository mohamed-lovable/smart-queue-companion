/**
 * Status Badge Component
 * Displays queue status with appropriate styling
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QueueStatus, ClinicStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: QueueStatus | ClinicStatus;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  animated = false 
}) => {
  const { t } = useLanguage();

  // Get status label based on type
  const getLabel = () => {
    switch (status) {
      case 'waiting': return t.statusWaiting;
      case 'almost': return t.statusAlmost;
      case 'serving': return t.statusServing;
      case 'done': return t.statusDone;
      case 'available': return t.available;
      case 'busy': return t.busy;
      case 'closed': return t.closed;
      default: return status;
    }
  };

  // Get status styles
  const getStyles = () => {
    switch (status) {
      case 'waiting':
        return 'bg-muted text-muted-foreground';
      case 'almost':
        return 'bg-warning/20 text-warning-foreground border-warning';
      case 'serving':
        return 'bg-success/20 text-success border-success';
      case 'done':
        return 'bg-muted text-muted-foreground';
      case 'available':
        return 'bg-success/20 text-success border-success';
      case 'busy':
        return 'bg-warning/20 text-warning-foreground border-warning';
      case 'closed':
        return 'bg-destructive/20 text-destructive border-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'text-xs px-2 py-0.5';
      case 'md': return 'text-sm px-3 py-1';
      case 'lg': return 'text-base px-4 py-1.5';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        getStyles(),
        getSizeStyles(),
        animated && (status === 'serving' || status === 'almost') && 'animate-pulse-queue'
      )}
    >
      {/* Indicator dot */}
      <span 
        className={cn(
          'w-2 h-2 rounded-full me-2',
          status === 'waiting' && 'bg-muted-foreground',
          status === 'almost' && 'bg-warning',
          status === 'serving' && 'bg-success',
          status === 'done' && 'bg-muted-foreground',
          status === 'available' && 'bg-success',
          status === 'busy' && 'bg-warning',
          status === 'closed' && 'bg-destructive',
        )}
      />
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
