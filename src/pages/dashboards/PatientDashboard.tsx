/**
 * Patient Dashboard Component
 * Shows queue status, clinic selection, and notifications
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueue } from '@/contexts/QueueContext';
import Layout from '@/components/Layout';
import ClinicCard from '@/components/ClinicCard';
import QueueNumberDisplay from '@/components/QueueNumberDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  UserPlus, 
  LogOut as LeaveIcon, 
  AlertTriangle,
  RefreshCw,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Priority } from '@/data/mockData';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { clinics, joinQueue, leaveQueue, getPatientQueue, getWaitingCount, refreshQueues } = useQueue();
  const { toast } = useToast();

  // State
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority>('normal');
  const [isJoining, setIsJoining] = useState(false);

  // Get patient's current queue entry
  const currentQueueEntry = user ? getPatientQueue(user.id) : undefined;
  
  // Auto-select clinic if patient is already in queue
  useEffect(() => {
    if (currentQueueEntry) {
      setSelectedClinicId(currentQueueEntry.clinicId);
    }
  }, [currentQueueEntry]);

  // Show notification when status changes to "almost" or "serving"
  useEffect(() => {
    if (currentQueueEntry) {
      if (currentQueueEntry.status === 'almost') {
        toast({
          title: '🔔 ' + t.yourTurnSoon,
          description: t.statusAlmost,
        });
      } else if (currentQueueEntry.status === 'serving') {
        toast({
          title: '✅ ' + t.yourTurnNow,
          description: t.statusServing,
        });
      }
    }
  }, [currentQueueEntry?.status]);

  // Handle join queue
  const handleJoinQueue = async () => {
    if (!user || !selectedClinicId) return;

    setIsJoining(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = joinQueue(
      user.id,
      user.name,
      user.nameAr,
      selectedClinicId,
      selectedPriority
    );

    if (result) {
      toast({
        title: t.success,
        description: `${t.joinQueue} - #${result.queueNumber}`,
      });
    } else {
      toast({
        title: t.error,
        description: 'You are already in this queue',
        variant: 'destructive',
      });
    }

    setIsJoining(false);
  };

  // Handle leave queue
  const handleLeaveQueue = () => {
    if (!currentQueueEntry) return;

    leaveQueue(currentQueueEntry.id);
    setSelectedClinicId(null);
    
    toast({
      title: t.success,
      description: t.leaveQueue,
    });
  };

  // Get patients waiting before current user
  const patientsBeforeMe = currentQueueEntry ? getWaitingCount(currentQueueEntry) : 0;

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.patientDashboardTitle}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL ? user?.nameAr : user?.name}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={refreshQueues}>
            <RefreshCw className="h-4 w-4 me-2" />
            Refresh
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Queue Status */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  {t.myQueueNumber}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQueueEntry ? (
                  <>
                    <QueueNumberDisplay
                      queueNumber={currentQueueEntry.queueNumber}
                      status={currentQueueEntry.status}
                      patientsBeforeYou={patientsBeforeMe}
                      estimatedWait={currentQueueEntry.estimatedWaitTime}
                    />
                    
                    {/* Leave Queue Button */}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 text-destructive border-destructive hover:bg-destructive/10"
                      onClick={handleLeaveQueue}
                    >
                      <LeaveIcon className="h-4 w-4 me-2" />
                      {t.leaveQueue}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t.selectClinic}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Clinic Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {t.selectClinic}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Priority Selection */}
                {!currentQueueEntry && (
                  <div className="mb-6 p-4 rounded-lg bg-muted/50">
                    <Label className="text-sm font-medium mb-3 block">
                      {t.priority}
                    </Label>
                    <RadioGroup
                      value={selectedPriority}
                      onValueChange={(value) => setSelectedPriority(value as Priority)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal" className="cursor-pointer">
                          {t.normal}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="cursor-pointer flex items-center gap-1 text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          {t.urgent}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Clinics Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {clinics.map((clinic) => (
                    <ClinicCard
                      key={clinic.id}
                      clinic={clinic}
                      selected={selectedClinicId === clinic.id}
                      onClick={() => !currentQueueEntry && setSelectedClinicId(clinic.id)}
                      showQueue={true}
                    />
                  ))}
                </div>

                {/* Join Queue Button */}
                {!currentQueueEntry && selectedClinicId && (
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleJoinQueue}
                    disabled={isJoining}
                  >
                    <UserPlus className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                    {isJoining ? t.loading : t.joinQueue}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
