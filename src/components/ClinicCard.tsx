/**
 * Clinic Card Component
 * Displays clinic information with status
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clinic, getDoctorForClinic } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { Heart, Bone, Baby, Stethoscope, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClinicCardProps {
  clinic: Clinic;
  onClick?: () => void;
  selected?: boolean;
  showQueue?: boolean;
}

// Icon mapping for clinics
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart: Heart,
  Bone: Bone,
  Baby: Baby,
};

const ClinicCard: React.FC<ClinicCardProps> = ({ 
  clinic, 
  onClick, 
  selected = false,
  showQueue = true 
}) => {
  const { t, isRTL } = useLanguage();
  
  // Get doctor for this clinic
  const doctor = getDoctorForClinic(clinic.id);
  
  // Get icon component
  const IconComponent = iconMap[clinic.icon] || Stethoscope;

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        selected && 'ring-2 ring-primary shadow-glow',
        'bg-card'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          {/* Icon and Title */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'p-3 rounded-xl',
              clinic.status === 'available' ? 'bg-primary/10' : 'bg-muted'
            )}>
              <IconComponent className={cn(
                'h-6 w-6',
                clinic.status === 'available' ? 'text-primary' : 'text-muted-foreground'
              )} />
            </div>
            <div>
              <CardTitle className="text-lg">
                {isRTL ? clinic.nameAr : clinic.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isRTL ? clinic.descriptionAr : clinic.description}
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <StatusBadge status={clinic.status} size="sm" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Doctor Info */}
        {doctor && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t.doctorName}:</span>
            <span className="font-medium">
              {isRTL ? doctor.nameAr : doctor.name}
            </span>
          </div>
        )}

        {/* Queue Info */}
        {showQueue && (
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t.currentQueue}:</span>
              <span className="font-bold text-lg text-primary">
                #{clinic.currentQueueNumber}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              ~{clinic.averageWaitTime} {t.minutes}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClinicCard;
