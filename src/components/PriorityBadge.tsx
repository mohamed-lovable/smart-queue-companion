/**
 * Priority Badge Component
 * Displays patient priority level
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Priority } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AlertTriangle, User } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  priority, 
  showIcon = true,
  size = 'md' 
}) => {
  const { t } = useLanguage();

  const isUrgent = priority === 'urgent';

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'text-xs px-2 py-0.5';
      case 'md': return 'text-sm px-3 py-1';
      case 'lg': return 'text-base px-4 py-1.5';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'md': return 'h-4 w-4';
      case 'lg': return 'h-5 w-5';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        getSizeStyles(),
        isUrgent 
          ? 'bg-destructive/20 text-destructive border border-destructive' 
          : 'bg-secondary text-secondary-foreground'
      )}
    >
      {showIcon && (
        isUrgent 
          ? <AlertTriangle className={cn(getIconSize(), 'me-1.5')} />
          : <User className={cn(getIconSize(), 'me-1.5')} />
      )}
      {isUrgent ? t.urgent : t.normal}
    </span>
  );
};

export default PriorityBadge;
