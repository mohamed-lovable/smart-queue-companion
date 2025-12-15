/**
 * Receptionist Dashboard Component
 * Manage patient check-ins and queue
 */

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueue } from '@/contexts/QueueContext';
import Layout from '@/components/Layout';
import ClinicCard from '@/components/ClinicCard';
import PatientQueueItem from '@/components/PatientQueueItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  ClipboardList, 
  UserPlus, 
  Building2,
  Users,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Priority } from '@/data/mockData';

const ReceptionistDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { clinics, joinQueue, getClinicQueue } = useQueue();
  const { toast } = useToast();

  // State
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    nameAr: '',
    priority: 'normal' as Priority,
  });

  // Get queue for selected clinic
  const selectedQueue = selectedClinicId ? getClinicQueue(selectedClinicId) : [];

  // Handle add patient to queue
  const handleAddPatient = () => {
    if (!selectedClinicId || !newPatient.name) {
      toast({
        title: t.error,
        description: 'Please fill in patient name',
        variant: 'destructive',
      });
      return;
    }

    // Generate a temporary patient ID
    const tempPatientId = `walk-in-${Date.now()}`;

    const result = joinQueue(
      tempPatientId,
      newPatient.name,
      newPatient.nameAr || newPatient.name,
      selectedClinicId,
      newPatient.priority
    );

    if (result) {
      toast({
        title: t.success,
        description: `Patient added - Queue #${result.queueNumber}`,
      });
      setIsDialogOpen(false);
      setNewPatient({ name: '', nameAr: '', priority: 'normal' });
    } else {
      toast({
        title: t.error,
        description: 'Failed to add patient to queue',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Reception Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL ? user?.nameAr : user?.name}
            </p>
          </div>
          
          {/* Add Patient Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!selectedClinicId}>
                <UserPlus className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                Add Walk-in Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Walk-in Patient</DialogTitle>
                <DialogDescription>
                  Register a new walk-in patient to the queue
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                {/* Patient Name */}
                <div className="space-y-2">
                  <Label htmlFor="patientName">{t.name} (English)</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                {/* Arabic Name (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="patientNameAr">{t.name} (Arabic - Optional)</Label>
                  <Input
                    id="patientNameAr"
                    placeholder="اسم المريض"
                    value={newPatient.nameAr}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, nameAr: e.target.value }))}
                    dir="rtl"
                  />
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label>{t.priority}</Label>
                  <RadioGroup
                    value={newPatient.priority}
                    onValueChange={(value) => setNewPatient(prev => ({ ...prev, priority: value as Priority }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="p-normal" />
                      <Label htmlFor="p-normal" className="cursor-pointer">
                        {t.normal}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="p-urgent" />
                      <Label htmlFor="p-urgent" className="cursor-pointer flex items-center gap-1 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        {t.urgent}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={handleAddPatient} className="w-full">
                  <UserPlus className={cn('h-5 w-5', isRTL ? 'ms-2' : 'me-2')} />
                  Add to Queue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Clinics Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {t.selectClinic}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className={cn(
                      'p-4 rounded-lg border-2 cursor-pointer transition-all',
                      selectedClinicId === clinic.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                    onClick={() => setSelectedClinicId(clinic.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {isRTL ? clinic.nameAr : clinic.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        #{clinic.currentQueueNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Queue Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {t.queueList}
                  </span>
                  {selectedClinicId && (
                    <span className="text-sm font-normal text-muted-foreground">
                      {selectedQueue.length} in queue
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedClinicId ? (
                  selectedQueue.length > 0 ? (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                      {selectedQueue.map((entry, index) => (
                        <PatientQueueItem
                          key={entry.id}
                          entry={entry}
                          isCurrentPatient={entry.status === 'serving'}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground">{t.noPatients}</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <ClipboardList className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">{t.selectClinic}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceptionistDashboard;
