/**
 * Translations for Smart Hospital Queue Management System
 * Supports English (LTR) and Arabic (RTL)
 */

export type Language = 'en' | 'ar';

export interface TranslationStrings {
  // Common
  appName: string;
  login: string;
  signup: string;
  logout: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  submit: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  back: string;
  next: string;
  loading: string;
  error: string;
  success: string;
  
  // Navigation
  home: string;
  demo: string;
  dashboard: string;
  settings: string;
  profile: string;
  
  // Auth
  loginTitle: string;
  signupTitle: string;
  noAccount: string;
  hasAccount: string;
  forgotPassword: string;
  invalidCredentials: string;
  loginSuccess: string;
  signupSuccess: string;
  selectRole: string;
  patient: string;
  doctor: string;
  receptionist: string;
  admin: string;
  
  // Home Page
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  viewDemo: string;
  featuresTitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  rolesTitle: string;
  patientRoleDesc: string;
  doctorRoleDesc: string;
  adminRoleDesc: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  ctaTitle: string;
  ctaSubtitle: string;
  
  // Demo Page
  demoTitle: string;
  demoSubtitle: string;
  clinicName: string;
  doctorName: string;
  status: string;
  currentQueue: string;
  nextPatient: string;
  available: string;
  busy: string;
  closed: string;
  
  // Patient Dashboard
  patientDashboardTitle: string;
  myQueueNumber: string;
  patientsBeforeYou: string;
  estimatedWait: string;
  minutes: string;
  checkMyTurn: string;
  statusWaiting: string;
  statusAlmost: string;
  statusServing: string;
  statusDone: string;
  selectClinic: string;
  joinQueue: string;
  leaveQueue: string;
  yourTurnSoon: string;
  yourTurnNow: string;
  
  // Doctor Dashboard
  doctorDashboardTitle: string;
  myClinic: string;
  currentPatient: string;
  queueList: string;
  callNext: string;
  markDone: string;
  noPatients: string;
  priority: string;
  normal: string;
  urgent: string;
  patientInfo: string;
  
  // Admin Dashboard
  adminDashboardTitle: string;
  overview: string;
  totalPatients: string;
  activeClinics: string;
  avgWaitTime: string;
  totalServedToday: string;
  clinicsManagement: string;
  usersOverview: string;
  systemStatus: string;
  online: string;
  offline: string;
  
  // Settings
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;
  arabic: string;
  english: string;
  
  // Footer
  copyright: string;
  allRightsReserved: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    // Common
    appName: 'Smart Hospital Queue',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Full Name',
    phone: 'Phone Number',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Navigation
    home: 'Home',
    demo: 'Demo',
    dashboard: 'Dashboard',
    settings: 'Settings',
    profile: 'Profile',
    
    // Auth
    loginTitle: 'Welcome Back',
    signupTitle: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    invalidCredentials: 'Invalid email or password',
    loginSuccess: 'Login successful!',
    signupSuccess: 'Account created successfully!',
    selectRole: 'Select your role',
    patient: 'Patient',
    doctor: 'Doctor',
    receptionist: 'Receptionist',
    admin: 'Administrator',
    
    // Home Page
    heroTitle: 'Smart Hospital Queue Management',
    heroSubtitle: 'Reduce waiting times and improve patient experience with our intelligent queue management system',
    getStarted: 'Get Started',
    viewDemo: 'View Demo',
    featuresTitle: 'Powerful Features',
    feature1Title: 'Smart Queue Management',
    feature1Desc: 'Intelligent system that optimizes patient flow and reduces congestion',
    feature2Title: 'Priority-Based Scheduling',
    feature2Desc: 'Urgent cases are automatically prioritized for faster service',
    feature3Title: 'Real-Time Notifications',
    feature3Desc: 'Stay updated with instant notifications about your queue status',
    feature4Title: 'Reduced Waiting Time',
    feature4Desc: 'Average waiting time reduced by 40% with our smart system',
    rolesTitle: 'For Everyone in Healthcare',
    patientRoleDesc: 'Book appointments, track your queue position, and receive notifications',
    doctorRoleDesc: 'Manage your patient queue efficiently and focus on providing care',
    adminRoleDesc: 'Monitor system performance, manage clinics, and view analytics',
    howItWorksTitle: 'How It Works',
    step1Title: 'Register',
    step1Desc: 'Create your account and complete your profile',
    step2Title: 'Choose Clinic',
    step2Desc: 'Select the clinic and doctor you want to visit',
    step3Title: 'Get Queue Number',
    step3Desc: 'Receive your queue number and estimated wait time',
    step4Title: 'Get Notified',
    step4Desc: 'Receive real-time updates when your turn approaches',
    ctaTitle: 'Ready to Get Started?',
    ctaSubtitle: 'Join thousands of patients enjoying a better healthcare experience',
    
    // Demo Page
    demoTitle: 'Live Queue Demo',
    demoSubtitle: 'See how our queue system works in real-time',
    clinicName: 'Clinic',
    doctorName: 'Doctor',
    status: 'Status',
    currentQueue: 'Current Queue',
    nextPatient: 'Next Patient',
    available: 'Available',
    busy: 'Busy',
    closed: 'Closed',
    
    // Patient Dashboard
    patientDashboardTitle: 'Patient Dashboard',
    myQueueNumber: 'My Queue Number',
    patientsBeforeYou: 'Patients Before You',
    estimatedWait: 'Estimated Wait',
    minutes: 'minutes',
    checkMyTurn: 'Check My Turn',
    statusWaiting: 'Waiting',
    statusAlmost: 'Almost Your Turn',
    statusServing: 'Now Serving',
    statusDone: 'Completed',
    selectClinic: 'Select a Clinic',
    joinQueue: 'Join Queue',
    leaveQueue: 'Leave Queue',
    yourTurnSoon: 'Your turn is coming up soon!',
    yourTurnNow: 'It\'s your turn! Please proceed to the clinic.',
    
    // Doctor Dashboard
    doctorDashboardTitle: 'Doctor Dashboard',
    myClinic: 'My Clinic',
    currentPatient: 'Current Patient',
    queueList: 'Queue List',
    callNext: 'Call Next Patient',
    markDone: 'Mark as Done',
    noPatients: 'No patients in queue',
    priority: 'Priority',
    normal: 'Normal',
    urgent: 'Urgent',
    patientInfo: 'Patient Information',
    
    // Admin Dashboard
    adminDashboardTitle: 'Admin Dashboard',
    overview: 'Overview',
    totalPatients: 'Total Patients',
    activeClinics: 'Active Clinics',
    avgWaitTime: 'Avg. Wait Time',
    totalServedToday: 'Served Today',
    clinicsManagement: 'Clinics Management',
    usersOverview: 'Users Overview',
    systemStatus: 'System Status',
    online: 'Online',
    offline: 'Offline',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    arabic: 'العربية',
    english: 'English',
    
    // Footer
    copyright: '© 2024 Smart Hospital Queue Management System',
    allRightsReserved: 'All rights reserved',
  },
  ar: {
    // Common
    appName: 'نظام إدارة طوابير المستشفى',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    back: 'رجوع',
    next: 'التالي',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجاح',
    
    // Navigation
    home: 'الرئيسية',
    demo: 'عرض توضيحي',
    dashboard: 'لوحة التحكم',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    
    // Auth
    loginTitle: 'مرحباً بعودتك',
    signupTitle: 'إنشاء حساب جديد',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    forgotPassword: 'نسيت كلمة المرور؟',
    invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    signupSuccess: 'تم إنشاء الحساب بنجاح!',
    selectRole: 'اختر دورك',
    patient: 'مريض',
    doctor: 'طبيب',
    receptionist: 'موظف استقبال',
    admin: 'مدير النظام',
    
    // Home Page
    heroTitle: 'نظام إدارة طوابير المستشفى الذكي',
    heroSubtitle: 'قلل أوقات الانتظار وحسّن تجربة المرضى مع نظام إدارة الطوابير الذكي',
    getStarted: 'ابدأ الآن',
    viewDemo: 'عرض توضيحي',
    featuresTitle: 'مميزات قوية',
    feature1Title: 'إدارة طوابير ذكية',
    feature1Desc: 'نظام ذكي يحسن تدفق المرضى ويقلل الازدحام',
    feature2Title: 'جدولة حسب الأولوية',
    feature2Desc: 'يتم إعطاء الأولوية للحالات الطارئة تلقائياً',
    feature3Title: 'إشعارات فورية',
    feature3Desc: 'ابق على اطلاع بحالة طابورك بإشعارات فورية',
    feature4Title: 'تقليل وقت الانتظار',
    feature4Desc: 'تقليل متوسط وقت الانتظار بنسبة 40%',
    rolesTitle: 'للجميع في مجال الرعاية الصحية',
    patientRoleDesc: 'احجز مواعيد، تتبع موقعك في الطابور، واستلم الإشعارات',
    doctorRoleDesc: 'أدر طابور مرضاك بكفاءة وركز على تقديم الرعاية',
    adminRoleDesc: 'راقب أداء النظام، أدر العيادات، واطلع على التحليلات',
    howItWorksTitle: 'كيف يعمل النظام',
    step1Title: 'التسجيل',
    step1Desc: 'أنشئ حسابك وأكمل ملفك الشخصي',
    step2Title: 'اختر العيادة',
    step2Desc: 'اختر العيادة والطبيب الذي تريد زيارته',
    step3Title: 'احصل على رقم الطابور',
    step3Desc: 'استلم رقم طابورك ووقت الانتظار المتوقع',
    step4Title: 'استلم الإشعارات',
    step4Desc: 'استلم تحديثات فورية عندما يقترب دورك',
    ctaTitle: 'مستعد للبدء؟',
    ctaSubtitle: 'انضم إلى آلاف المرضى الذين يستمتعون بتجربة رعاية صحية أفضل',
    
    // Demo Page
    demoTitle: 'عرض مباشر للطوابير',
    demoSubtitle: 'شاهد كيف يعمل نظام الطوابير في الوقت الفعلي',
    clinicName: 'العيادة',
    doctorName: 'الطبيب',
    status: 'الحالة',
    currentQueue: 'الطابور الحالي',
    nextPatient: 'المريض التالي',
    available: 'متاح',
    busy: 'مشغول',
    closed: 'مغلق',
    
    // Patient Dashboard
    patientDashboardTitle: 'لوحة تحكم المريض',
    myQueueNumber: 'رقم الطابور',
    patientsBeforeYou: 'عدد المرضى قبلك',
    estimatedWait: 'وقت الانتظار المتوقع',
    minutes: 'دقيقة',
    checkMyTurn: 'تحقق من دوري',
    statusWaiting: 'في الانتظار',
    statusAlmost: 'دورك قريب',
    statusServing: 'جاري الخدمة',
    statusDone: 'مكتمل',
    selectClinic: 'اختر عيادة',
    joinQueue: 'انضم للطابور',
    leaveQueue: 'غادر الطابور',
    yourTurnSoon: 'دورك قريب جداً!',
    yourTurnNow: 'إنه دورك الآن! يرجى التوجه للعيادة.',
    
    // Doctor Dashboard
    doctorDashboardTitle: 'لوحة تحكم الطبيب',
    myClinic: 'عيادتي',
    currentPatient: 'المريض الحالي',
    queueList: 'قائمة الطابور',
    callNext: 'استدعاء المريض التالي',
    markDone: 'تم الانتهاء',
    noPatients: 'لا يوجد مرضى في الطابور',
    priority: 'الأولوية',
    normal: 'عادي',
    urgent: 'طارئ',
    patientInfo: 'معلومات المريض',
    
    // Admin Dashboard
    adminDashboardTitle: 'لوحة تحكم المدير',
    overview: 'نظرة عامة',
    totalPatients: 'إجمالي المرضى',
    activeClinics: 'العيادات النشطة',
    avgWaitTime: 'متوسط وقت الانتظار',
    totalServedToday: 'تمت خدمتهم اليوم',
    clinicsManagement: 'إدارة العيادات',
    usersOverview: 'نظرة عامة على المستخدمين',
    systemStatus: 'حالة النظام',
    online: 'متصل',
    offline: 'غير متصل',
    
    // Settings
    language: 'اللغة',
    theme: 'المظهر',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    arabic: 'العربية',
    english: 'English',
    
    // Footer
    copyright: '© 2024 نظام إدارة طوابير المستشفى الذكي',
    allRightsReserved: 'جميع الحقوق محفوظة',
  },
};
