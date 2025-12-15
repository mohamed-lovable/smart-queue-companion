/**
 * Doctor Dashboard Component
 * Manage patient queue, call next, mark as done
 */

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueue } from '@/contexts/QueueContext';
import { getClinicById } from '@/data/mockData';
import Layout from '@/components/Layout';
import PatientQueueItem from '@/components/PatientQueueItem';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Stethoscope, 
  Users, 
  UserCheck, 
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { getClinicQueue, callNextPatient, markPatientDone } = useQueue();
  const { toast } = useToast();

  // Get doctor's clinic
  const clinic = user?.clinicId ? getClinicById(user.clinicId) : null;
  
  // Get queue for this clinic
  const queue = clinic ? getClinicQueue(clinic.id) : [];
  
  // Get current patient being served
  const currentPatient = queue.find(q => q.status === 'serving');
  
  // Get waiting patients
  const waitingPatients = queue.filter(q => q.status === 'waiting' || q.status === 'almost');

  // Handle call next patient
  const handleCallNext = () => {
    if (!clinic) return;

    const nextPatient = callNextPatient(clinic.id);
    
    if (nextPatient) {
      toast({
        title: t.success,
        description: `Calling patient #${nextPatient.queueNumber}`,
      });
    } else {
      toast({
        title: t.error,
        description: t.noPatients,
        variant: 'destructive',
      });
    }
  };

  // Handle mark patient as done
  const handleMarkDone = () => {
    if (!currentPatient) return;

    markPatientDone(currentPatient.id);
    
    toast({
      title: t.success,
      description: t.markDone,
    });
  };

  // If doctor has no clinic assigned
  if (!clinic) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Clinic Assigned
            </h2>
            <p className="text-muted-foreground">
              Please contact administration to assign you to a clinic.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.doctorDashboardTitle}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL ? user?.nameAr : user?.name}
            </p>
          </div>
          <StatusBadge status={clinic.status} size="lg" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.queueList}</p>
                <p className="text-2xl font-bold">{waitingPatients.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.totalServedToday}</p>
                <p className="text-2xl font-bold">{clinic.totalServed}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.avgWaitTime}</p>
                <p className="text-2xl font-bold">~{clinic.averageWaitTime} min</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Patient */}
          <Card className={cn(
            'border-2',
            currentPatient ? 'border-success bg-success/5' : 'border-dashed'
          )}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-success" />
                {t.currentPatient}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPatient ? (
                <>
                  <div className="text-center py-6">
                    <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-success">
                        #{currentPatient.queueNumber}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {isRTL ? currentPatient.patientNameAr : currentPatient.patientName}
                    </h3>
                    <div className="mt-2">
                      <StatusBadge status={currentPatient.status} size="lg" animated />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={handleCallNext}
                      disabled={waitingPatients.length === 0}
                    >
                      <ChevronRight className={cn('h-5 w-5', isRTL ? 'ms-2 rtl-flip' : 'me-2')} />
                      {t.callNext}
                    </Button>
                    <Button 
                      size="lg"
                      onClick={handleMarkDone}
                      className="bg-success hover:bg-success/90"
                    >
                      <CheckCircle2 className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                      {t.markDone}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Stethoscope className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    {t.noPatients}
                  </p>
                  <Button onClick={handleCallNext} disabled={waitingPatients.length === 0}>
                    <ChevronRight className={cn('h-5 w-5', isRTL ? 'ms-2 rtl-flip' : 'me-2')} />
                    {t.callNext}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {t.queueList}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {waitingPatients.length} {t.statusWaiting}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {waitingPatients.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {waitingPatients.map((entry, index) => (
                    <PatientQueueItem
                      key={entry.id}
                      entry={entry}
                      isCurrentPatient={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">{t.noPatients}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
