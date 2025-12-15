/**
 * Mock Data for Smart Hospital Queue Management System
 * Contains all dummy data for users, clinics, doctors, and queues
 */

// User roles enum for type safety
export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'admin';

// Queue status types
export type QueueStatus = 'waiting' | 'almost' | 'serving' | 'done' | 'cancelled';

// Priority levels for queue
export type Priority = 'normal' | 'urgent';

// Clinic status
export type ClinicStatus = 'available' | 'busy' | 'closed';

// User interface
export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  name: string;
  nameAr: string;
  role: UserRole;
  avatar?: string;
  clinicId?: string; // For doctors
  phone?: string;
}

// Clinic interface
export interface Clinic {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  status: ClinicStatus;
  doctorId: string;
  currentQueueNumber: number;
  totalServed: number;
  averageWaitTime: number; // in minutes
}

// Queue entry interface
export interface QueueEntry {
  id: string;
  patientId: string;
  patientName: string;
  patientNameAr: string;
  clinicId: string;
  queueNumber: number;
  priority: Priority;
  status: QueueStatus;
  checkInTime: Date;
  estimatedWaitTime: number; // in minutes
  notes?: string;
}

// Mock Users Data
export const mockUsers: User[] = [
  // Admin user
  {
    id: 'admin-001',
    email: 'admin@hospital.com',
    password: 'admin123',
    name: 'System Administrator',
    nameAr: 'مدير النظام',
    role: 'admin',
    phone: '+966501234567',
  },
  // Doctors
  {
    id: 'doc-001',
    email: 'dr.ahmed@hospital.com',
    password: 'doctor123',
    name: 'Dr. Ahmed Hassan',
    nameAr: 'د. أحمد حسن',
    role: 'doctor',
    clinicId: 'clinic-001',
    phone: '+966502345678',
  },
  {
    id: 'doc-002',
    email: 'dr.sara@hospital.com',
    password: 'doctor123',
    name: 'Dr. Sara Mohammed',
    nameAr: 'د. سارة محمد',
    role: 'doctor',
    clinicId: 'clinic-002',
    phone: '+966503456789',
  },
  {
    id: 'doc-003',
    email: 'dr.khalid@hospital.com',
    password: 'doctor123',
    name: 'Dr. Khalid Ali',
    nameAr: 'د. خالد علي',
    role: 'doctor',
    clinicId: 'clinic-003',
    phone: '+966504567890',
  },
  // Receptionist
  {
    id: 'rec-001',
    email: 'reception@hospital.com',
    password: 'reception123',
    name: 'Fatima Al-Rashid',
    nameAr: 'فاطمة الراشد',
    role: 'receptionist',
    phone: '+966505678901',
  },
  // Patients
  {
    id: 'pat-001',
    email: 'patient@hospital.com',
    password: 'patient123',
    name: 'Mohammed Al-Farsi',
    nameAr: 'محمد الفارسي',
    role: 'patient',
    phone: '+966506789012',
  },
  {
    id: 'pat-002',
    email: 'layla@email.com',
    password: 'patient123',
    name: 'Layla Ibrahim',
    nameAr: 'ليلى إبراهيم',
    role: 'patient',
    phone: '+966507890123',
  },
  {
    id: 'pat-003',
    email: 'omar@email.com',
    password: 'patient123',
    name: 'Omar Saeed',
    nameAr: 'عمر سعيد',
    role: 'patient',
    phone: '+966508901234',
  },
  {
    id: 'pat-004',
    email: 'nora@email.com',
    password: 'patient123',
    name: 'Nora Abdullah',
    nameAr: 'نورة عبدالله',
    role: 'patient',
    phone: '+966509012345',
  },
  {
    id: 'pat-005',
    email: 'yusuf@email.com',
    password: 'patient123',
    name: 'Yusuf Hassan',
    nameAr: 'يوسف حسن',
    role: 'patient',
    phone: '+966510123456',
  },
];

// Mock Clinics Data
export const mockClinics: Clinic[] = [
  {
    id: 'clinic-001',
    name: 'Cardiology',
    nameAr: 'قسم القلب',
    description: 'Heart and cardiovascular care',
    descriptionAr: 'رعاية القلب والأوعية الدموية',
    icon: 'Heart',
    status: 'available',
    doctorId: 'doc-001',
    currentQueueNumber: 5,
    totalServed: 23,
    averageWaitTime: 15,
  },
  {
    id: 'clinic-002',
    name: 'Orthopedics',
    nameAr: 'قسم العظام',
    description: 'Bone and joint specialists',
    descriptionAr: 'متخصصون في العظام والمفاصل',
    icon: 'Bone',
    status: 'busy',
    doctorId: 'doc-002',
    currentQueueNumber: 8,
    totalServed: 31,
    averageWaitTime: 25,
  },
  {
    id: 'clinic-003',
    name: 'Pediatrics',
    nameAr: 'قسم الأطفال',
    description: 'Children healthcare',
    descriptionAr: 'رعاية صحة الأطفال',
    icon: 'Baby',
    status: 'available',
    doctorId: 'doc-003',
    currentQueueNumber: 3,
    totalServed: 18,
    averageWaitTime: 10,
  },
];

// Mock Queue Data
export const mockQueue: QueueEntry[] = [
  // Cardiology Queue
  {
    id: 'q-001',
    patientId: 'pat-001',
    patientName: 'Mohammed Al-Farsi',
    patientNameAr: 'محمد الفارسي',
    clinicId: 'clinic-001',
    queueNumber: 5,
    priority: 'normal',
    status: 'serving',
    checkInTime: new Date(Date.now() - 45 * 60000),
    estimatedWaitTime: 0,
  },
  {
    id: 'q-002',
    patientId: 'pat-002',
    patientName: 'Layla Ibrahim',
    patientNameAr: 'ليلى إبراهيم',
    clinicId: 'clinic-001',
    queueNumber: 6,
    priority: 'urgent',
    status: 'almost',
    checkInTime: new Date(Date.now() - 30 * 60000),
    estimatedWaitTime: 5,
  },
  {
    id: 'q-003',
    patientId: 'pat-003',
    patientName: 'Omar Saeed',
    patientNameAr: 'عمر سعيد',
    clinicId: 'clinic-001',
    queueNumber: 7,
    priority: 'normal',
    status: 'waiting',
    checkInTime: new Date(Date.now() - 15 * 60000),
    estimatedWaitTime: 15,
  },
  // Orthopedics Queue
  {
    id: 'q-004',
    patientId: 'pat-004',
    patientName: 'Nora Abdullah',
    patientNameAr: 'نورة عبدالله',
    clinicId: 'clinic-002',
    queueNumber: 8,
    priority: 'normal',
    status: 'serving',
    checkInTime: new Date(Date.now() - 60 * 60000),
    estimatedWaitTime: 0,
  },
  {
    id: 'q-005',
    patientId: 'pat-005',
    patientName: 'Yusuf Hassan',
    patientNameAr: 'يوسف حسن',
    clinicId: 'clinic-002',
    queueNumber: 9,
    priority: 'urgent',
    status: 'waiting',
    checkInTime: new Date(Date.now() - 20 * 60000),
    estimatedWaitTime: 25,
  },
  // Pediatrics Queue
  {
    id: 'q-006',
    patientId: 'pat-001',
    patientName: 'Mohammed Al-Farsi',
    patientNameAr: 'محمد الفارسي',
    clinicId: 'clinic-003',
    queueNumber: 3,
    priority: 'normal',
    status: 'waiting',
    checkInTime: new Date(Date.now() - 10 * 60000),
    estimatedWaitTime: 10,
  },
];

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Helper function to authenticate user
export const authenticateUser = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Helper function to get clinic by ID
export const getClinicById = (id: string): Clinic | undefined => {
  return mockClinics.find(clinic => clinic.id === id);
};

// Helper function to get doctor for clinic
export const getDoctorForClinic = (clinicId: string): User | undefined => {
  const clinic = getClinicById(clinicId);
  if (clinic) {
    return mockUsers.find(user => user.id === clinic.doctorId);
  }
  return undefined;
};

// Helper function to get queue for clinic
export const getQueueForClinic = (clinicId: string): QueueEntry[] => {
  return mockQueue
    .filter(entry => entry.clinicId === clinicId && entry.status !== 'done' && entry.status !== 'cancelled')
    .sort((a, b) => {
      // Sort by priority first (urgent before normal), then by queue number
      if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
      if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
      return a.queueNumber - b.queueNumber;
    });
};

// Helper function to get patient queue entry
export const getPatientQueueEntry = (patientId: string, clinicId?: string): QueueEntry | undefined => {
  return mockQueue.find(entry => 
    entry.patientId === patientId && 
    entry.status !== 'done' && 
    entry.status !== 'cancelled' &&
    (!clinicId || entry.clinicId === clinicId)
  );
};

// Helper function to calculate patients before
export const getPatientsBeforeCount = (queueEntry: QueueEntry): number => {
  const clinicQueue = getQueueForClinic(queueEntry.clinicId);
  const position = clinicQueue.findIndex(entry => entry.id === queueEntry.id);
  return Math.max(0, position);
};

// Statistics for admin dashboard
export const getSystemStats = () => {
  const totalPatients = mockUsers.filter(u => u.role === 'patient').length;
  const activeClinics = mockClinics.filter(c => c.status !== 'closed').length;
  const totalInQueue = mockQueue.filter(q => q.status === 'waiting' || q.status === 'almost').length;
  const totalServedToday = mockClinics.reduce((sum, c) => sum + c.totalServed, 0);
  const avgWaitTime = Math.round(
    mockClinics.reduce((sum, c) => sum + c.averageWaitTime, 0) / mockClinics.length
  );

  return {
    totalPatients,
    activeClinics,
    totalClinics: mockClinics.length,
    totalInQueue,
    totalServedToday,
    avgWaitTime,
    totalDoctors: mockUsers.filter(u => u.role === 'doctor').length,
    totalStaff: mockUsers.filter(u => u.role === 'receptionist').length,
  };
};
