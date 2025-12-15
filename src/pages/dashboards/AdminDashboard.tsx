/**
 * Admin Dashboard Component
 * System overview, clinic management, user statistics
 */

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueue } from '@/contexts/QueueContext';
import { getSystemStats, mockUsers } from '@/data/mockData';
import Layout from '@/components/Layout';
import StatsCard from '@/components/StatsCard';
import ClinicCard from '@/components/ClinicCard';
import StatusBadge from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building2, 
  Clock, 
  CheckCircle2,
  Stethoscope,
  UserCog,
  Activity,
  Server,
  Database,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { clinics, queues } = useQueue();

  // Get system statistics
  const stats = getSystemStats();

  // Calculate additional stats
  const totalInQueue = queues.filter(q => 
    q.status === 'waiting' || q.status === 'almost' || q.status === 'serving'
  ).length;
  
  const urgentCases = queues.filter(q => 
    q.priority === 'urgent' && q.status !== 'done' && q.status !== 'cancelled'
  ).length;

  // Get user counts by role
  const usersByRole = {
    patients: mockUsers.filter(u => u.role === 'patient').length,
    doctors: mockUsers.filter(u => u.role === 'doctor').length,
    receptionists: mockUsers.filter(u => u.role === 'receptionist').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.adminDashboardTitle}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL ? user?.nameAr : user?.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span className="text-muted-foreground">{t.systemStatus}: {t.online}</span>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title={t.totalPatients}
            value={stats.totalPatients}
            icon={<Users className="h-6 w-6 text-primary" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title={t.activeClinics}
            value={`${stats.activeClinics}/${stats.totalClinics}`}
            icon={<Building2 className="h-6 w-6 text-primary" />}
          />
          <StatsCard
            title={t.avgWaitTime}
            value={`${stats.avgWaitTime} min`}
            icon={<Clock className="h-6 w-6 text-primary" />}
            trend={{ value: 8, isPositive: false }}
          />
          <StatsCard
            title={t.totalServedToday}
            value={stats.totalServedToday}
            icon={<CheckCircle2 className="h-6 w-6 text-primary" />}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Clinics Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {t.clinicsManagement}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {clinics.map((clinic) => (
                    <ClinicCard
                      key={clinic.id}
                      clinic={clinic}
                      showQueue={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Users Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-primary" />
                  {t.usersOverview}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{t.patient}s</span>
                  </div>
                  <span className="font-bold">{usersByRole.patients}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-success" />
                    <span>{t.doctor}s</span>
                  </div>
                  <span className="font-bold">{usersByRole.doctors}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <UserCog className="h-5 w-5 text-warning" />
                    <span>{t.receptionist}s</span>
                  </div>
                  <span className="font-bold">{usersByRole.receptionists}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-info" />
                    <span>{t.admin}s</span>
                  </div>
                  <span className="font-bold">{usersByRole.admins}</span>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  {t.systemStatus}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-success" />
                    <span>Server</span>
                  </div>
                  <StatusBadge status="available" size="sm" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-success" />
                    <span>Database</span>
                  </div>
                  <StatusBadge status="available" size="sm" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Active Queue</span>
                  </div>
                  <span className="font-bold">{totalInQueue}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-destructive" />
                    <span>Urgent Cases</span>
                  </div>
                  <span className="font-bold text-destructive">{urgentCases}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
