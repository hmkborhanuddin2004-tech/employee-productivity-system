export interface EmployeeTaskItem {
  id: string;
  title: string;
  project: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  deliverable?: string;
  deliverableUrl?: string;
}

export interface Employee {
  id: string;
  code: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  departmentId: string;
  shiftId: string;
  shiftName: string;
  shiftHours: string;
  status: 'active' | 'idle' | 'break' | 'offline';
  idleMinutes: number;
  lastHeartbeat: string;
  todayHours: number;
  monthlyScore: number;
  monthlyIdlePercent: number;
  autoLaunchEnabled: boolean;
  latestUpdate: string;
  latestUpdateProject: string;
  email: string;
  joinedDate: string;
  dailyTasksCompleted: number;
  dailyTasksTotal: number;
  dailyWorkCompletionPercent: number;
  deliverableSummary: string;
  itemizedTasks?: EmployeeTaskItem[];
  avgActivityDensity?: number;
  evasionAlertsCount?: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  headCount: number;
  activeNow: number;
  avgScore: number;
  description: string;
  color: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  gracePeriodMinutes: number;
  autoStartEnabled: boolean;
  assignedCount: number;
  activeCount: number;
  days: string[];
}

export interface ScreenshotItem {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  departmentId: string;
  shiftId: string;
  shiftName: string;
  timestamp: string;
  timeAgo: string;
  triggerReason: 'Routine Shift Interval' | 'Prolonged Inactivity Check' | 'Shift Check-in' | 'Task Milestone Submission';
  windowTitle: string;
  activeApp: string;
  resolution: string;
  isBlurred: boolean;
  signedUrlExpiry: string;
  auditBadge: string;
  colorTheme: string;
  isArchived?: boolean;
  archivedAt?: string;
  activityDensityPercent: number;
  densityCategory: 'high' | 'moderate' | 'suspicious';
  hasMediaFlag?: boolean;
  isEvasionFlagged?: boolean;
  evasionReason?: string;
  interactionMetrics?: {
    mouseClicks: number;
    keyStrokes: number;
    scrollEvents: number;
    intervalMinutes: number;
  };
  captureIntervalType?: 'randomized' | 'fixed';
  nextRandomEstimate?: string;
}

export interface WorkUpdate {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  timestamp: string;
  timeAgo: string;
  project: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'blocked';
  deliverableUrl?: string;
  hoursSpent: number;
}

export interface DailyAnalytics {
  day: number;
  date: string;
  activeHours: number;
  idleHours: number;
  score: number;
  isProjected?: boolean;
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'it',
    name: 'Engineering & IT',
    code: 'ENG',
    head: 'HMk Borhan Uddin',
    headCount: 8,
    activeNow: 6,
    avgScore: 94.2,
    description: 'Core software engineering, desktop agents, automation scripts, and cloud infrastructure.',
    color: 'indigo'
  },
  {
    id: 'marketing',
    name: 'Digital Marketing & Growth',
    code: 'MKT',
    head: 'Nusrat Jahan',
    headCount: 6,
    activeNow: 4,
    avgScore: 91.8,
    description: 'Performance campaigns, social engagement, content creation, and brand outreach.',
    color: 'emerald'
  },
  {
    id: 'finance',
    name: 'Accounts & Corporate Finance',
    code: 'FIN',
    head: 'Rafiqul Islam',
    headCount: 4,
    activeNow: 3,
    avgScore: 96.0,
    description: 'Financial audits, payroll disbursement, tax filings, and fiscal reporting.',
    color: 'amber'
  },
  {
    id: 'hr',
    name: 'Human Resources & Talent',
    code: 'HRD',
    head: 'Sadia Rahman',
    headCount: 3,
    activeNow: 2,
    avgScore: 93.5,
    description: 'People operations, shift policy compliance, talent acquisition, and employee well-being.',
    color: 'purple'
  },
  {
    id: 'creative',
    name: 'Creative & Media Production',
    code: 'CRT',
    head: 'Tanvir Ahmed',
    headCount: 5,
    activeNow: 3,
    avgScore: 89.4,
    description: 'Motion design, UI/UX asset rendering, product photography, and video storytelling.',
    color: 'rose'
  }
];

export const SHIFTS: Shift[] = [
  {
    id: 'shift-morning',
    name: 'Morning Standard Shift',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    totalHours: 9,
    gracePeriodMinutes: 10,
    autoStartEnabled: true,
    assignedCount: 16,
    activeCount: 12,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: 'shift-evening',
    name: 'Evening Support Shift',
    startTime: '02:00 PM',
    endTime: '11:00 PM',
    totalHours: 9,
    gracePeriodMinutes: 15,
    autoStartEnabled: true,
    assignedCount: 6,
    activeCount: 4,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: 'shift-flex',
    name: 'Flexible Remote Shift',
    startTime: '10:00 AM',
    endTime: '07:00 PM',
    totalHours: 9,
    gracePeriodMinutes: 20,
    autoStartEnabled: true,
    assignedCount: 4,
    activeCount: 2,
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu']
  }
];

export const EMPLOYEES: Employee[] = [
  // --- ENGINEERING & IT (8 members) ---
  {
    id: 'emp-101',
    code: 'EMP-101',
    name: 'HMk Borhan Uddin',
    avatar: 'HB',
    role: 'Lead AI Engineer & Solutions Architect',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 0,
    lastHeartbeat: '12s ago',
    todayHours: 6.8,
    monthlyScore: 97.4,
    monthlyIdlePercent: 2.6,
    autoLaunchEnabled: true,
    latestUpdate: 'Implemented secure desktop heartbeat ping & encrypted IPC bridge',
    latestUpdateProject: 'Core Productivity Agent',
    email: 'borhan.uddin@apexwork.internal',
    joinedDate: 'Jan 2024',
    dailyTasksCompleted: 5,
    dailyTasksTotal: 6,
    dailyWorkCompletionPercent: 83,
    deliverableSummary: 'Desktop IPC bridge & idle heartbeat sensor'
  },
  {
    id: 'emp-104',
    code: 'EMP-104',
    name: 'Farhan Kabir',
    avatar: 'FK',
    role: 'DevOps & Cloud Security Engineer',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'idle',
    idleMinutes: 8,
    lastHeartbeat: '8m ago',
    todayHours: 5.4,
    monthlyScore: 91.5,
    monthlyIdlePercent: 8.5,
    autoLaunchEnabled: true,
    latestUpdate: 'Configured automated database backup scripts & S3 bucket lockdown',
    latestUpdateProject: 'Infrastructure Hardening',
    email: 'farhan.kabir@apexwork.internal',
    joinedDate: 'Apr 2024',
    dailyTasksCompleted: 3,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 75,
    deliverableSummary: 'S3 bucket lockdown & automated backup scripts'
  },
  {
    id: 'emp-107',
    code: 'EMP-107',
    name: 'Mahir Faisal',
    avatar: 'MF',
    role: 'Backend API Developer',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-flex',
    shiftName: 'Flexible Remote (10:00 - 19:00)',
    shiftHours: '10:00 AM - 07:00 PM',
    status: 'break',
    idleMinutes: 22,
    lastHeartbeat: '22m ago',
    todayHours: 4.8,
    monthlyScore: 88.7,
    monthlyIdlePercent: 11.3,
    autoLaunchEnabled: true,
    latestUpdate: 'Drafted OpenAPI schema for shift ingestion endpoint',
    latestUpdateProject: 'API Gateway v2',
    email: 'mahir.faisal@apexwork.internal',
    joinedDate: 'May 2024',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 50,
    deliverableSummary: 'OpenAPI schema for shift ingestion endpoint'
  },
  {
    id: 'emp-110',
    code: 'EMP-110',
    name: 'Kazi Rayhan',
    avatar: 'KR',
    role: 'Senior Fullstack Engineer',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 1,
    lastHeartbeat: '35s ago',
    todayHours: 6.1,
    monthlyScore: 95.8,
    monthlyIdlePercent: 4.2,
    autoLaunchEnabled: true,
    latestUpdate: 'Integrated WebSocket server push for live shift status updates',
    latestUpdateProject: 'Real-Time Telemetry',
    email: 'kazi.rayhan@apexwork.internal',
    joinedDate: 'Jun 2024',
    dailyTasksCompleted: 5,
    dailyTasksTotal: 5,
    dailyWorkCompletionPercent: 100,
    deliverableSummary: 'WebSocket live server push for shift telemetry'
  },
  {
    id: 'emp-111',
    code: 'EMP-111',
    name: 'Shakil Anwar',
    avatar: 'SA',
    role: 'QA & Test Automation Lead',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 2,
    lastHeartbeat: '1m ago',
    todayHours: 5.9,
    monthlyScore: 93.2,
    monthlyIdlePercent: 6.8,
    autoLaunchEnabled: true,
    latestUpdate: 'Executed 140 automated integration test cases on shift triggers',
    latestUpdateProject: 'Agent Test Suite',
    email: 'shakil.anwar@apexwork.internal',
    joinedDate: 'Aug 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 5,
    dailyWorkCompletionPercent: 80,
    deliverableSummary: '140 automated integration test cases'
  },
  {
    id: 'emp-112',
    code: 'EMP-112',
    name: 'Fahim Morshed',
    avatar: 'FM',
    role: 'Database Administrator',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 0,
    lastHeartbeat: '18s ago',
    todayHours: 6.4,
    monthlyScore: 96.1,
    monthlyIdlePercent: 3.9,
    autoLaunchEnabled: true,
    latestUpdate: 'Optimized PostgreSQL partitioning for high-frequency heartbeat logs',
    latestUpdateProject: 'Telemetry DB Tuning',
    email: 'fahim.morshed@apexwork.internal',
    joinedDate: 'Mar 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 100,
    deliverableSummary: 'PostgreSQL partitioning optimization'
  },
  {
    id: 'emp-113',
    code: 'EMP-113',
    name: 'Navid Hasan',
    avatar: 'NH',
    role: 'Systems & Network Engineer',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support (14:00 - 23:00)',
    shiftHours: '02:00 PM - 11:00 PM',
    status: 'active',
    idleMinutes: 3,
    lastHeartbeat: '2m ago',
    todayHours: 3.5,
    monthlyScore: 92.0,
    monthlyIdlePercent: 8.0,
    autoLaunchEnabled: true,
    latestUpdate: 'Monitoring edge latency and SSL cert renewals for desktop API',
    latestUpdateProject: 'Infrastructure Hardening',
    email: 'navid.hasan@apexwork.internal',
    joinedDate: 'Sep 2024',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 67,
    deliverableSummary: 'Edge latency & SSL monitoring'
  },
  {
    id: 'emp-114',
    code: 'EMP-114',
    name: 'Tamim Iqbal',
    avatar: 'TI',
    role: 'Security & Penetration Tester',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-flex',
    shiftName: 'Flexible Remote (10:00 - 19:00)',
    shiftHours: '10:00 AM - 07:00 PM',
    status: 'offline',
    idleMinutes: 0,
    lastHeartbeat: 'Yesterday',
    todayHours: 0,
    monthlyScore: 90.5,
    monthlyIdlePercent: 9.5,
    autoLaunchEnabled: true,
    latestUpdate: 'Audit verified: zero keylogger binaries or covert screen captures present',
    latestUpdateProject: 'Security Audit',
    email: 'tamim.iqbal@apexwork.internal',
    joinedDate: 'Oct 2024',
    dailyTasksCompleted: 1,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 33,
    deliverableSummary: 'Privacy security audit verification'
  },

  // --- DIGITAL MARKETING & GROWTH (6 members) ---
  {
    id: 'emp-103',
    code: 'EMP-103',
    name: 'Nusrat Jahan',
    avatar: 'NJ',
    role: 'Growth Marketing Lead',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 2,
    lastHeartbeat: '1m ago',
    todayHours: 6.2,
    monthlyScore: 93.8,
    monthlyIdlePercent: 6.2,
    autoLaunchEnabled: true,
    latestUpdate: 'Analyzed weekly user acquisition funnel & ad performance',
    latestUpdateProject: 'Q3 Enterprise Campaign',
    email: 'nusrat.jahan@apexwork.internal',
    joinedDate: 'Feb 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 5,
    dailyWorkCompletionPercent: 80,
    deliverableSummary: 'User acquisition funnel & ad audit'
  },
  {
    id: 'emp-108',
    code: 'EMP-108',
    name: 'Zareen Subah',
    avatar: 'ZS',
    role: 'Content Strategist & Copywriter',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support (14:00 - 23:00)',
    shiftHours: '02:00 PM - 11:00 PM',
    status: 'active',
    idleMinutes: 0,
    lastHeartbeat: '30s ago',
    todayHours: 3.2,
    monthlyScore: 92.6,
    monthlyIdlePercent: 7.4,
    autoLaunchEnabled: true,
    latestUpdate: 'Drafted 4 high-converting enterprise case study articles',
    latestUpdateProject: 'Q3 Enterprise Campaign',
    email: 'zareen.subah@apexwork.internal',
    joinedDate: 'Jun 2024',
    dailyTasksCompleted: 3,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 75,
    deliverableSummary: '4 enterprise case study articles'
  },
  {
    id: 'emp-115',
    code: 'EMP-115',
    name: 'Ashfaqur Rahman',
    avatar: 'AR',
    role: 'SEO & Organic Growth Specialist',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 4,
    lastHeartbeat: '3m ago',
    todayHours: 5.7,
    monthlyScore: 91.0,
    monthlyIdlePercent: 9.0,
    autoLaunchEnabled: true,
    latestUpdate: 'Indexed 48 technical keyword clusters for productivity software search',
    latestUpdateProject: 'Organic Search Strategy',
    email: 'ashfaq.rahman@apexwork.internal',
    joinedDate: 'Jul 2024',
    dailyTasksCompleted: 3,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 75,
    deliverableSummary: '48 technical keyword clusters indexed'
  },
  {
    id: 'emp-116',
    code: 'EMP-116',
    name: 'Samira Khan',
    avatar: 'SK',
    role: 'Social Media & Community Specialist',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 1,
    lastHeartbeat: '40s ago',
    todayHours: 5.5,
    monthlyScore: 90.4,
    monthlyIdlePercent: 9.6,
    autoLaunchEnabled: true,
    latestUpdate: 'Published LinkedIn announcement on transparent shift monitoring standards',
    latestUpdateProject: 'Social Awareness',
    email: 'samira.khan@apexwork.internal',
    joinedDate: 'Aug 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 100,
    deliverableSummary: 'LinkedIn transparent monitoring announcement'
  },
  {
    id: 'emp-117',
    code: 'EMP-117',
    name: 'Rashedul Karim',
    avatar: 'RK',
    role: 'Paid Acquisition & PPC Analyst',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support (14:00 - 23:00)',
    shiftHours: '02:00 PM - 11:00 PM',
    status: 'break',
    idleMinutes: 18,
    lastHeartbeat: '18m ago',
    todayHours: 2.9,
    monthlyScore: 89.9,
    monthlyIdlePercent: 10.1,
    autoLaunchEnabled: true,
    latestUpdate: 'A/B testing ad headlines on Meta Ads manager for corporate clients',
    latestUpdateProject: 'Q3 Enterprise Campaign',
    email: 'rashed.karim@apexwork.internal',
    joinedDate: 'May 2024',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 67,
    deliverableSummary: 'Meta Ads headline A/B tests'
  },
  {
    id: 'emp-118',
    code: 'EMP-118',
    name: 'Laila Chowdhury',
    avatar: 'LC',
    role: 'Email Marketing & CRM Automation Lead',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-flex',
    shiftName: 'Flexible Remote (10:00 - 19:00)',
    shiftHours: '10:00 AM - 07:00 PM',
    status: 'offline',
    idleMinutes: 0,
    lastHeartbeat: 'Yesterday',
    todayHours: 0,
    monthlyScore: 92.1,
    monthlyIdlePercent: 7.9,
    autoLaunchEnabled: true,
    latestUpdate: 'Automated welcome onboarding sequence for enterprise portal trial users',
    latestUpdateProject: 'CRM Automation',
    email: 'laila.chowdhury@apexwork.internal',
    joinedDate: 'Apr 2024',
    dailyTasksCompleted: 1,
    dailyTasksTotal: 2,
    dailyWorkCompletionPercent: 50,
    deliverableSummary: 'Enterprise onboarding email sequences'
  },

  // --- ACCOUNTS & CORPORATE FINANCE (4 members) ---
  {
    id: 'emp-106',
    code: 'EMP-106',
    name: 'Rafiqul Islam',
    avatar: 'RI',
    role: 'Senior Financial Auditor',
    department: 'Accounts & Corporate Finance',
    departmentId: 'finance',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 3,
    lastHeartbeat: '2m ago',
    todayHours: 7.1,
    monthlyScore: 98.0,
    monthlyIdlePercent: 2.0,
    autoLaunchEnabled: true,
    latestUpdate: 'Finalized monthly vendor balance sheet reconciliation and tax summary',
    latestUpdateProject: 'Fiscal Year Audit',
    email: 'rafiqul.islam@apexwork.internal',
    joinedDate: 'Feb 2023',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 100,
    deliverableSummary: 'Vendor balance sheet & tax reconciliation'
  },
  {
    id: 'emp-119',
    code: 'EMP-119',
    name: 'Moniruzzaman Mia',
    avatar: 'MM',
    role: 'Payroll & Compensation Officer',
    department: 'Accounts & Corporate Finance',
    departmentId: 'finance',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 1,
    lastHeartbeat: '50s ago',
    todayHours: 6.7,
    monthlyScore: 96.5,
    monthlyIdlePercent: 3.5,
    autoLaunchEnabled: true,
    latestUpdate: 'Cross-verified monthly shift hours against automated desktop logged hours',
    latestUpdateProject: 'Payroll Disbursement',
    email: 'monir.mia@apexwork.internal',
    joinedDate: 'Mar 2023',
    dailyTasksCompleted: 3,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 75,
    deliverableSummary: 'Monthly shift hours verification'
  },
  {
    id: 'emp-120',
    code: 'EMP-120',
    name: 'Tahmina Akter',
    avatar: 'TA',
    role: 'Accounts Payable & Billing Specialist',
    department: 'Accounts & Corporate Finance',
    departmentId: 'finance',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 0,
    lastHeartbeat: '25s ago',
    todayHours: 6.3,
    monthlyScore: 95.4,
    monthlyIdlePercent: 4.6,
    autoLaunchEnabled: true,
    latestUpdate: 'Processed 34 cloud infrastructure invoices and vendor reimbursements',
    latestUpdateProject: 'Vendor Disbursements',
    email: 'tahmina.akter@apexwork.internal',
    joinedDate: 'Nov 2023',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 5,
    dailyWorkCompletionPercent: 80,
    deliverableSummary: '34 cloud infrastructure invoices processed'
  },
  {
    id: 'emp-121',
    code: 'EMP-121',
    name: 'Habibur Rahman',
    avatar: 'HR',
    role: 'Tax Compliance & Reporting Analyst',
    department: 'Accounts & Corporate Finance',
    departmentId: 'finance',
    shiftId: 'shift-flex',
    shiftName: 'Flexible Remote (10:00 - 19:00)',
    shiftHours: '10:00 AM - 07:00 PM',
    status: 'idle',
    idleMinutes: 12,
    lastHeartbeat: '12m ago',
    todayHours: 4.5,
    monthlyScore: 94.2,
    monthlyIdlePercent: 5.8,
    autoLaunchEnabled: true,
    latestUpdate: 'Drafted Q3 corporate tax return filing documentation',
    latestUpdateProject: 'Tax Compliance',
    email: 'habib.rahman@apexwork.internal',
    joinedDate: 'Dec 2023',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 67,
    deliverableSummary: 'Q3 corporate tax return filing'
  },

  // --- HUMAN RESOURCES & TALENT (3 members) ---
  {
    id: 'emp-105',
    code: 'EMP-105',
    name: 'Sadia Rahman',
    avatar: 'SR',
    role: 'People Operations Manager',
    department: 'Human Resources & Talent',
    departmentId: 'hr',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 0,
    lastHeartbeat: '28s ago',
    todayHours: 6.9,
    monthlyScore: 95.2,
    monthlyIdlePercent: 4.8,
    autoLaunchEnabled: true,
    latestUpdate: 'Reviewed monthly shift compliance scores and updated privacy consent log',
    latestUpdateProject: 'Workplace Ethics Audit',
    email: 'sadia.rahman@apexwork.internal',
    joinedDate: 'Jan 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 100,
    deliverableSummary: 'Digital consent sign-off with 26 members'
  },
  {
    id: 'emp-122',
    code: 'EMP-122',
    name: 'Nazmul Huda',
    avatar: 'NH',
    role: 'Talent Acquisition Specialist',
    department: 'Human Resources & Talent',
    departmentId: 'hr',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 2,
    lastHeartbeat: '2m ago',
    todayHours: 5.8,
    monthlyScore: 93.0,
    monthlyIdlePercent: 7.0,
    autoLaunchEnabled: true,
    latestUpdate: 'Interviewed 3 senior fullstack candidates for Engineering department',
    latestUpdateProject: 'Talent Hiring Sprint',
    email: 'nazmul.huda@apexwork.internal',
    joinedDate: 'May 2024',
    dailyTasksCompleted: 3,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 75,
    deliverableSummary: '3 senior fullstack engineer interviews'
  },
  {
    id: 'emp-123',
    code: 'EMP-123',
    name: 'Farzana Yesmin',
    avatar: 'FY',
    role: 'Employee Relations & Culture Coordinator',
    department: 'Human Resources & Talent',
    departmentId: 'hr',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support (14:00 - 23:00)',
    shiftHours: '02:00 PM - 11:00 PM',
    status: 'break',
    idleMinutes: 15,
    lastHeartbeat: '15m ago',
    todayHours: 3.1,
    monthlyScore: 92.4,
    monthlyIdlePercent: 7.6,
    autoLaunchEnabled: true,
    latestUpdate: 'Scheduled quarterly team building and anonymous wellness survey',
    latestUpdateProject: 'Wellness & Retention',
    email: 'farzana.yesmin@apexwork.internal',
    joinedDate: 'Jun 2024',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 67,
    deliverableSummary: 'Quarterly team wellness survey setup'
  },

  // --- CREATIVE & MEDIA PRODUCTION (5 members) ---
  {
    id: 'emp-102',
    code: 'EMP-102',
    name: 'Tanvir Ahmed',
    avatar: 'TA',
    role: 'Senior Frontend & UI/UX Specialist',
    department: 'Creative & Media Production',
    departmentId: 'creative',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 1,
    lastHeartbeat: '45s ago',
    todayHours: 6.5,
    monthlyScore: 94.1,
    monthlyIdlePercent: 5.9,
    autoLaunchEnabled: true,
    latestUpdate: 'Completed SVG visual charts & interactive shift roster scheduler',
    latestUpdateProject: 'Enterprise Portal',
    email: 'tanvir.ahmed@apexwork.internal',
    joinedDate: 'Mar 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 5,
    dailyWorkCompletionPercent: 80,
    deliverableSummary: 'Responsive SVG analytics & shift timetable'
  },
  {
    id: 'emp-109',
    code: 'EMP-109',
    name: 'Arif Hasan',
    avatar: 'AH',
    role: 'Senior Video Editor & Animator',
    department: 'Creative & Media Production',
    departmentId: 'creative',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support (14:00 - 23:00)',
    shiftHours: '02:00 PM - 11:00 PM',
    status: 'offline',
    idleMinutes: 0,
    lastHeartbeat: 'Yesterday',
    todayHours: 0,
    monthlyScore: 89.2,
    monthlyIdlePercent: 10.8,
    autoLaunchEnabled: true,
    latestUpdate: 'Exported final 4K promotional product video teaser',
    latestUpdateProject: 'Product Launch 2026',
    email: 'arif.hasan@apexwork.internal',
    joinedDate: 'Jul 2024',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 67,
    deliverableSummary: '4K promotional video teaser export'
  },
  {
    id: 'emp-124',
    code: 'EMP-124',
    name: 'Mehedi Hasan',
    avatar: 'MH',
    role: 'Motion Graphics & 3D Artist',
    department: 'Creative & Media Production',
    departmentId: 'creative',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 0,
    lastHeartbeat: '20s ago',
    todayHours: 6.2,
    monthlyScore: 91.8,
    monthlyIdlePercent: 8.2,
    autoLaunchEnabled: true,
    latestUpdate: 'Rendered 3D workstation preview renders for product feature hero',
    latestUpdateProject: 'Brand Visuals',
    email: 'mehedi.hasan@apexwork.internal',
    joinedDate: 'Jun 2024',
    dailyTasksCompleted: 4,
    dailyTasksTotal: 5,
    dailyWorkCompletionPercent: 80,
    deliverableSummary: '3D workstation preview renders'
  },
  {
    id: 'emp-125',
    code: 'EMP-125',
    name: 'Rina Sultana',
    avatar: 'RS',
    role: 'Graphic Designer & Brand Asset Artist',
    department: 'Creative & Media Production',
    departmentId: 'creative',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard (09:00 - 18:00)',
    shiftHours: '09:00 AM - 06:00 PM',
    status: 'active',
    idleMinutes: 2,
    lastHeartbeat: '2m ago',
    todayHours: 5.8,
    monthlyScore: 90.5,
    monthlyIdlePercent: 9.5,
    autoLaunchEnabled: true,
    latestUpdate: 'Created responsive icon badges and banner illustrations for web portal',
    latestUpdateProject: 'Design System',
    email: 'rina.sultana@apexwork.internal',
    joinedDate: 'Aug 2024',
    dailyTasksCompleted: 3,
    dailyTasksTotal: 4,
    dailyWorkCompletionPercent: 75,
    deliverableSummary: 'Responsive icon badges & banner illustrations'
  },
  {
    id: 'emp-126',
    code: 'EMP-126',
    name: 'Bilal Hossain',
    avatar: 'BH',
    role: 'Sound Designer & Media Producer',
    department: 'Creative & Media Production',
    departmentId: 'creative',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support (14:00 - 23:00)',
    shiftHours: '02:00 PM - 11:00 PM',
    status: 'active',
    idleMinutes: 3,
    lastHeartbeat: '3m ago',
    todayHours: 3.4,
    monthlyScore: 88.0,
    monthlyIdlePercent: 12.0,
    autoLaunchEnabled: true,
    latestUpdate: 'Mastered voiceover audio tracks for client walkthrough tutorial',
    latestUpdateProject: 'Media Production',
    email: 'bilal.hossain@apexwork.internal',
    joinedDate: 'Sep 2024',
    dailyTasksCompleted: 2,
    dailyTasksTotal: 3,
    dailyWorkCompletionPercent: 67,
    deliverableSummary: 'Voiceover audio track mastering'
  }
];

export const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'sc-801',
    employeeId: 'emp-101',
    employeeName: 'HMk Borhan Uddin',
    employeeAvatar: 'HB',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard',
    timestamp: '2026-09-19 14:15:22 BST',
    timeAgo: '4 mins ago',
    triggerReason: 'Routine Shift Interval',
    windowTitle: 'agent_heartbeat.py - employee-productivity-system - VS Code',
    activeApp: 'Visual Studio Code',
    resolution: '1920x1080',
    isBlurred: false,
    signedUrlExpiry: '11m 45s remaining',
    auditBadge: 'AUDIT-LOG-1892A',
    colorTheme: 'blue',
    isArchived: false,
    activityDensityPercent: 94,
    densityCategory: 'high',
    interactionMetrics: {
      mouseClicks: 42,
      keyStrokes: 184,
      scrollEvents: 36,
      intervalMinutes: 11
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '11m (Randomized Shutter)',
    isEvasionFlagged: false
  },
  {
    id: 'sc-802',
    employeeId: 'emp-102',
    employeeName: 'Tanvir Ahmed',
    employeeAvatar: 'TA',
    department: 'Creative & Media Production',
    departmentId: 'creative',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard',
    timestamp: '2026-09-19 14:08:47 BST',
    timeAgo: '11 mins ago',
    triggerReason: 'Routine Shift Interval',
    windowTitle: 'Dashboard - Figma - Google Chrome',
    activeApp: 'Figma',
    resolution: '2560x1440',
    isBlurred: false,
    signedUrlExpiry: '6m 20s remaining',
    auditBadge: 'AUDIT-LOG-1891B',
    colorTheme: 'purple',
    isArchived: false,
    activityDensityPercent: 88,
    densityCategory: 'high',
    interactionMetrics: {
      mouseClicks: 114,
      keyStrokes: 96,
      scrollEvents: 58,
      intervalMinutes: 9
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '14m (Randomized Shutter)',
    isEvasionFlagged: false
  },
  {
    id: 'sc-803',
    employeeId: 'emp-104',
    employeeName: 'Farhan Kabir',
    employeeAvatar: 'FK',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard',
    timestamp: '2026-09-19 13:56:14 BST',
    timeAgo: '23 mins ago',
    triggerReason: 'Prolonged Inactivity Check',
    windowTitle: 'Terminal - docker-compose ps & aws logs tail',
    activeApp: 'Windows Terminal',
    resolution: '1920x1080',
    isBlurred: true,
    signedUrlExpiry: 'Expired (Token Refreshed)',
    auditBadge: 'AUDIT-LOG-1889C',
    colorTheme: 'zinc',
    isArchived: false,
    activityDensityPercent: 78,
    densityCategory: 'high',
    interactionMetrics: {
      mouseClicks: 18,
      keyStrokes: 210,
      scrollEvents: 12,
      intervalMinutes: 14
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '8m (Randomized Shutter)',
    isEvasionFlagged: false
  },
  {
    id: 'sc-804',
    employeeId: 'emp-103',
    employeeName: 'Nusrat Jahan',
    employeeAvatar: 'NJ',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard',
    timestamp: '2026-09-19 13:50:31 BST',
    timeAgo: '29 mins ago',
    triggerReason: 'Routine Shift Interval',
    windowTitle: 'Google Chrome - YouTube [Tech Podcast & Gaming Streams - Playing]',
    activeApp: 'Google Chrome',
    resolution: '1920x1080',
    isBlurred: false,
    signedUrlExpiry: 'Re-authenticated',
    auditBadge: 'AUDIT-LOG-1885D',
    colorTheme: 'rose',
    isArchived: false,
    activityDensityPercent: 12,
    densityCategory: 'suspicious',
    hasMediaFlag: true,
    isEvasionFlagged: true,
    evasionReason: 'Media / Non-Work Window Flagged (Streaming Video in Foreground)',
    interactionMetrics: {
      mouseClicks: 4,
      keyStrokes: 2,
      scrollEvents: 6,
      intervalMinutes: 16
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '9m (Randomized Shutter)'
  },
  {
    id: 'sc-805',
    employeeId: 'emp-106',
    employeeName: 'Rafiqul Islam',
    employeeAvatar: 'RI',
    department: 'Accounts & Corporate Finance',
    departmentId: 'finance',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard',
    timestamp: '2026-09-19 13:40:11 BST',
    timeAgo: '39 mins ago',
    triggerReason: 'Task Milestone Submission',
    windowTitle: 'Monthly_Payroll_Reconciliation_Sept2026.xlsx - Excel',
    activeApp: 'Microsoft Excel',
    resolution: '1920x1080',
    isBlurred: true,
    signedUrlExpiry: 'Audit Vault Encrypted',
    auditBadge: 'AUDIT-LOG-1880E',
    colorTheme: 'amber',
    isArchived: false,
    activityDensityPercent: 4,
    densityCategory: 'suspicious',
    isEvasionFlagged: true,
    evasionReason: 'Ghost Inactivity / Low Interaction (<30%) — Sheet open with zero keyboard activity (Phone Scrolling)',
    interactionMetrics: {
      mouseClicks: 2,
      keyStrokes: 0,
      scrollEvents: 1,
      intervalMinutes: 18
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '13m (Randomized Shutter)'
  },
  {
    id: 'sc-806',
    employeeId: 'emp-108',
    employeeName: 'Zareen Subah',
    employeeAvatar: 'ZS',
    department: 'Digital Marketing & Growth',
    departmentId: 'marketing',
    shiftId: 'shift-evening',
    shiftName: 'Evening Support',
    timestamp: '2026-09-19 14:05:54 BST',
    timeAgo: '14 mins ago',
    triggerReason: 'Shift Check-in',
    windowTitle: 'Notion - Enterprise Case Studies 2026 Draft',
    activeApp: 'Notion Desktop',
    resolution: '1920x1080',
    isBlurred: false,
    signedUrlExpiry: '0m 52s remaining',
    auditBadge: 'AUDIT-LOG-1890F',
    colorTheme: 'cyan',
    isArchived: false,
    activityDensityPercent: 82,
    densityCategory: 'high',
    interactionMetrics: {
      mouseClicks: 38,
      keyStrokes: 142,
      scrollEvents: 24,
      intervalMinutes: 13
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '10m (Randomized Shutter)',
    isEvasionFlagged: false
  },
  {
    id: 'sc-807',
    employeeId: 'emp-105',
    employeeName: 'Sadia Rahman',
    employeeAvatar: 'SR',
    department: 'Human Resources & Talent',
    departmentId: 'hr',
    shiftId: 'shift-morning',
    shiftName: 'Morning Standard',
    timestamp: '2026-09-19 13:15:00 BST',
    timeAgo: '1h 04m ago',
    triggerReason: 'Routine Shift Interval',
    windowTitle: 'Workplace_Ethics_Charter_v2.pdf - Adobe Acrobat Reader',
    activeApp: 'Adobe Acrobat',
    resolution: '1920x1080',
    isBlurred: false,
    signedUrlExpiry: '14m 10s remaining',
    auditBadge: 'AUDIT-LOG-1875G',
    colorTheme: 'purple',
    isArchived: false,
    activityDensityPercent: 54,
    densityCategory: 'moderate',
    interactionMetrics: {
      mouseClicks: 32,
      keyStrokes: 14,
      scrollEvents: 84,
      intervalMinutes: 15
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '15m (Randomized Shutter)',
    isEvasionFlagged: false
  },
  {
    id: 'sc-808',
    employeeId: 'emp-107',
    employeeName: 'Mahir Faisal',
    employeeAvatar: 'MF',
    department: 'Engineering & IT',
    departmentId: 'it',
    shiftId: 'shift-flex',
    shiftName: 'Flexible Remote',
    timestamp: '2026-09-19 12:30:45 BST',
    timeAgo: '1h 48m ago',
    triggerReason: 'Task Milestone Submission',
    windowTitle: 'Postman - Shift Ingestion API Endpoint Tests [200 OK]',
    activeApp: 'Postman',
    resolution: '1920x1080',
    isBlurred: false,
    signedUrlExpiry: 'Audit Vault Encrypted',
    auditBadge: 'AUDIT-LOG-1869H',
    colorTheme: 'emerald',
    isArchived: false,
    activityDensityPercent: 91,
    densityCategory: 'high',
    interactionMetrics: {
      mouseClicks: 68,
      keyStrokes: 140,
      scrollEvents: 22,
      intervalMinutes: 11
    },
    captureIntervalType: 'randomized',
    nextRandomEstimate: '12m (Randomized Shutter)',
    isEvasionFlagged: false
  }
];

export const WORK_UPDATES: WorkUpdate[] = [
  {
    id: 'upd-301',
    employeeId: 'emp-101',
    employeeName: 'HMk Borhan Uddin',
    employeeAvatar: 'HB',
    department: 'Engineering & IT',
    timestamp: '2026-09-19 14:00 BST',
    timeAgo: '20 mins ago',
    project: 'Core Productivity Agent',
    title: 'Completed heartbeat loop and zero-overhead idle sensor',
    description: 'Finished implementing Windows GetLastInputInfo API binding with 10-second heartbeat ping. Added local buffer to hold telemetry during temporary network outages.',
    status: 'completed',
    deliverableUrl: 'https://github.com/apexwork/desktop-client/pull/42',
    hoursSpent: 3.5
  },
  {
    id: 'upd-302',
    employeeId: 'emp-102',
    employeeName: 'Tanvir Ahmed',
    employeeAvatar: 'TA',
    department: 'Creative & Media Production',
    timestamp: '2026-09-19 13:30 BST',
    timeAgo: '50 mins ago',
    project: 'Enterprise Portal',
    title: 'Designed responsive SVG analytics & shift timetable',
    description: 'Built pure CSS and lightweight SVG charts showing active vs idle distribution across 30 days. Styled department cards with instant modal drilldowns.',
    status: 'completed',
    deliverableUrl: 'https://github.com/apexwork/web/commit/b82f10',
    hoursSpent: 4.0
  },
  {
    id: 'upd-303',
    employeeId: 'emp-103',
    employeeName: 'Nusrat Jahan',
    employeeAvatar: 'NJ',
    department: 'Digital Marketing & Growth',
    timestamp: '2026-09-19 12:45 BST',
    timeAgo: '1.5 hrs ago',
    project: 'Q3 Enterprise Campaign',
    title: 'Audited LinkedIn & Google Ads conversion funnels',
    description: 'Identified 18% improvement in CTR for the automated shift management solution copy. Reallocated $400 daily spend to high-intent B2B search terms.',
    status: 'completed',
    deliverableUrl: 'https://drive.google.com/audit-report-sept-2026',
    hoursSpent: 2.5
  },
  {
    id: 'upd-304',
    employeeId: 'emp-104',
    employeeName: 'Farhan Kabir',
    employeeAvatar: 'FK',
    department: 'Engineering & IT',
    timestamp: '2026-09-19 12:15 BST',
    timeAgo: '2 hrs ago',
    project: 'Infrastructure Hardening',
    title: 'Configuring encrypted bucket policies for screenshot vault',
    description: 'Enforcing 15-minute max expiration on pre-signed URLs and zero-trust IAM roles. Encountered permission propagation lag on Supabase S3 storage adapter.',
    status: 'in_progress',
    hoursSpent: 2.0
  },
  {
    id: 'upd-305',
    employeeId: 'emp-105',
    employeeName: 'Sadia Rahman',
    employeeAvatar: 'SR',
    department: 'Human Resources & Talent',
    timestamp: '2026-09-19 11:30 BST',
    timeAgo: '2.8 hrs ago',
    project: 'Workplace Ethics Audit',
    title: 'Completed digital consent sign-off with 26 department members',
    description: 'All team members completed the privacy disclosure briefing. Confirmed that no keystroke logging or covert webcam monitoring is practiced on work devices.',
    status: 'completed',
    deliverableUrl: 'https://internal.apexwork.com/compliance/consent-log',
    hoursSpent: 3.0
  },
  {
    id: 'upd-306',
    employeeId: 'emp-107',
    employeeName: 'Mahir Faisal',
    employeeAvatar: 'MF',
    department: 'Engineering & IT',
    timestamp: '2026-09-19 10:45 BST',
    timeAgo: '3.5 hrs ago',
    project: 'API Gateway v2',
    title: 'Integrating batch heartbeat validation pipeline',
    description: 'Facing occasional connection timeout when 30 simultaneous desktop agents push 10s heartbeats. Benchmarking Redis buffer vs direct Postgres inserts.',
    status: 'blocked',
    hoursSpent: 2.8
  }
];

// Full 30-day continuous dataset for September 2026
export const MONTHLY_ANALYTICS: DailyAnalytics[] = [
  { day: 1, date: 'Sep 01', activeHours: 7.8, idleHours: 0.6, score: 92.8 },
  { day: 2, date: 'Sep 02', activeHours: 8.1, idleHours: 0.4, score: 95.3 },
  { day: 3, date: 'Sep 03', activeHours: 7.5, idleHours: 0.8, score: 90.3 },
  { day: 4, date: 'Sep 04', activeHours: 8.3, idleHours: 0.3, score: 96.5 },
  { day: 5, date: 'Sep 05', activeHours: 6.9, idleHours: 0.9, score: 88.4 },
  { day: 6, date: 'Sep 06', activeHours: 0.0, idleHours: 0.0, score: 0.0 }, // Sat Weekend
  { day: 7, date: 'Sep 07', activeHours: 0.0, idleHours: 0.0, score: 0.0 }, // Sun Weekend
  { day: 8, date: 'Sep 08', activeHours: 8.0, idleHours: 0.5, score: 94.1 },
  { day: 9, date: 'Sep 09', activeHours: 8.2, idleHours: 0.4, score: 95.3 },
  { day: 10, date: 'Sep 10', activeHours: 7.9, idleHours: 0.6, score: 92.9 },
  { day: 11, date: 'Sep 11', activeHours: 8.4, idleHours: 0.3, score: 96.5 },
  { day: 12, date: 'Sep 12', activeHours: 7.6, idleHours: 0.7, score: 91.5 },
  { day: 13, date: 'Sep 13', activeHours: 0.0, idleHours: 0.0, score: 0.0 }, // Sat Weekend
  { day: 14, date: 'Sep 14', activeHours: 0.0, idleHours: 0.0, score: 0.0 }, // Sun Weekend
  { day: 15, date: 'Sep 15', activeHours: 8.5, idleHours: 0.2, score: 97.7 },
  { day: 16, date: 'Sep 16', activeHours: 8.1, idleHours: 0.5, score: 94.2 },
  { day: 17, date: 'Sep 17', activeHours: 7.8, idleHours: 0.6, score: 92.8 },
  { day: 18, date: 'Sep 18', activeHours: 8.2, idleHours: 0.4, score: 95.3 },
  { day: 19, date: 'Sep 19', activeHours: 6.8, idleHours: 0.3, score: 95.8 }, // Today
  // Days 20 to 30: Scheduled/Projected
  { day: 20, date: 'Sep 20', activeHours: 0.0, idleHours: 0.0, score: 0.0, isProjected: true }, // Sun Weekend
  { day: 21, date: 'Sep 21', activeHours: 8.0, idleHours: 0.5, score: 94.1, isProjected: true },
  { day: 22, date: 'Sep 22', activeHours: 8.2, idleHours: 0.4, score: 95.3, isProjected: true },
  { day: 23, date: 'Sep 23', activeHours: 7.9, idleHours: 0.6, score: 92.9, isProjected: true },
  { day: 24, date: 'Sep 24', activeHours: 8.1, idleHours: 0.4, score: 95.3, isProjected: true },
  { day: 25, date: 'Sep 25', activeHours: 7.7, idleHours: 0.7, score: 91.6, isProjected: true },
  { day: 26, date: 'Sep 26', activeHours: 0.0, idleHours: 0.0, score: 0.0, isProjected: true }, // Sat Weekend
  { day: 27, date: 'Sep 27', activeHours: 0.0, idleHours: 0.0, score: 0.0, isProjected: true }, // Sun Weekend
  { day: 28, date: 'Sep 28', activeHours: 8.3, idleHours: 0.3, score: 96.5, isProjected: true },
  { day: 29, date: 'Sep 29', activeHours: 8.0, idleHours: 0.5, score: 94.1, isProjected: true },
  { day: 30, date: 'Sep 30', activeHours: 8.4, idleHours: 0.3, score: 96.5, isProjected: true }
];

export const SYSTEM_SETTINGS = {
  idleTimeoutMinutes: 10,
  screenshotIntervalMinutes: 15,
  retentionDays: 30,
  retentionPolicy: 'manual_discretionary' as 'manual_discretionary' | 'auto_purge',
  discretionaryManualArchive: true,
  signedUrlExpiryMinutes: 15,
  autoLaunchGracePeriodMinutes: 10,
  blurFinancialApps: true,
  desktopNotificationsEnabled: true,
  keystrokeLoggingBlocked: true, // Permanent hard-coded privacy guard
  webcamSurveillanceBlocked: true, // Permanent hard-coded privacy guard
  randomizedCaptureInterval: true,
  randomizedMinMinutes: 8,
  randomizedMaxMinutes: 18,
  activityDensityThresholdPercent: 30,
  mediaWindowInterception: true,
  ghostInactivityDetection: true
};

// ==========================================
// WORK QUOTA & DELIVERABLE LEDGER UTILITIES
// ==========================================

export function calculateQuotaPercent(completed: number | null | undefined, quota: number | null | undefined): number {
  const safeQuota = Math.max(0, Number(quota) || 0);
  const safeCompleted = Math.max(0, Number(completed) || 0);
  if (safeQuota === 0) return 0;
  return Math.round((safeCompleted / safeQuota) * 100);
}

export function getQuotaProgressBarColor(percent: number): string {
  if (percent >= 80) return 'from-emerald-500 to-teal-400';
  if (percent >= 50) return 'from-amber-500 to-yellow-400';
  return 'from-rose-500 to-red-400';
}

export function getQuotaSolidColor(percent: number): string {
  if (percent >= 80) return 'bg-emerald-500';
  if (percent >= 50) return 'bg-amber-500';
  return 'bg-rose-500';
}

export function getQuotaStatus(completed: number | null | undefined, quota: number | null | undefined): {
  label: 'Target Met' | 'On Track' | 'Behind Schedule' | 'No Quota Set';
  badgeClass: string;
  color: 'emerald' | 'blue' | 'amber' | 'slate' | 'rose';
} {
  const safeQuota = Math.max(0, Number(quota) || 0);
  const safeCompleted = Math.max(0, Number(completed) || 0);
  if (safeQuota === 0) {
    return {
      label: 'No Quota Set',
      badgeClass: 'bg-slate-800 text-slate-400 border-slate-700',
      color: 'slate'
    };
  }
  const percent = Math.round((safeCompleted / safeQuota) * 100);
  if (percent >= 100) {
    return {
      label: 'Target Met',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      color: 'emerald'
    };
  }
  if (percent >= 70) {
    return {
      label: 'On Track',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      color: 'blue'
    };
  }
  return {
    label: 'Behind Schedule',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    color: 'rose'
  };
}

export function getEmployeeTasks(emp: Employee): EmployeeTaskItem[] {
  if (emp.itemizedTasks && Array.isArray(emp.itemizedTasks)) {
    return emp.itemizedTasks;
  }

  const rawTotal = emp.dailyTasksTotal ?? 4;
  if (rawTotal === 0) {
    return [];
  }

  const total = Math.max(1, rawTotal);
  const completed = Math.min(total, Math.max(0, emp.dailyTasksCompleted ?? 0));

  const deptPresets: Record<string, { title: string; project: string }[]> = {
    it: [
      { title: emp.deliverableSummary || 'Core IPC bridge & idle heartbeat sensor', project: emp.latestUpdateProject || 'Core Productivity Agent' },
      { title: 'Secure WebSocket shift telemetry handshake verification', project: 'Real-Time Telemetry' },
      { title: 'PostgreSQL partition index tuning & query optimization', project: 'Telemetry DB Tuning' },
      { title: 'Automated shift trigger & edge latency test runner', project: 'Agent Test Suite' },
      { title: 'Encrypted screenshot bucket policy validation & IAM audit', project: 'Infrastructure Hardening' },
      { title: 'API gateway rate limiter and error boundary logging', project: 'API Gateway v2' }
    ],
    marketing: [
      { title: emp.deliverableSummary || 'User acquisition funnel & ad performance audit', project: emp.latestUpdateProject || 'Q3 Enterprise Campaign' },
      { title: 'Drafted 4 high-converting enterprise case study articles', project: 'Content Strategy' },
      { title: 'Indexed 48 technical keyword clusters for enterprise search', project: 'Organic Search Strategy' },
      { title: 'Social media announcement and community engagement recap', project: 'Social Awareness' },
      { title: 'Meta Ads headline A/B test variations & conversion tracking', project: 'Paid Acquisition' },
      { title: 'Automated customer onboarding email sequence optimization', project: 'CRM Automation' }
    ],
    finance: [
      { title: emp.deliverableSummary || 'Vendor balance sheet & tax summary reconciliation', project: emp.latestUpdateProject || 'Fiscal Year Audit' },
      { title: 'Cross-verified monthly shift hours with telemetry records', project: 'Payroll Disbursement' },
      { title: 'Processed 34 cloud infrastructure vendor invoices', project: 'Vendor Disbursements' },
      { title: 'Drafted Q3 corporate tax filing documentation & annexures', project: 'Tax Compliance' },
      { title: 'Quarterly financial forecast and ledger reconciliation', project: 'Fiscal Planning' }
    ],
    hr: [
      { title: emp.deliverableSummary || 'Digital consent sign-off with 26 department members', project: emp.latestUpdateProject || 'Workplace Ethics Audit' },
      { title: 'Interviewed 3 senior technical candidates for Engineering', project: 'Talent Hiring Sprint' },
      { title: 'Scheduled quarterly team building & wellness pulse survey', project: 'Wellness & Retention' },
      { title: 'Shift policy compliance score review & manager briefing', project: 'People Operations' },
      { title: 'Updated internal employee handbook with privacy guarantees', project: 'Compliance' }
    ],
    creative: [
      { title: emp.deliverableSummary || 'Responsive SVG analytics & shift timetable rendering', project: emp.latestUpdateProject || 'Enterprise Portal' },
      { title: 'Exported final 4K promotional product video teaser', project: 'Product Launch 2026' },
      { title: 'Rendered 3D workstation preview visuals for feature hero', project: 'Brand Visuals' },
      { title: 'Created responsive icon badges and banner illustrations', project: 'Design System' },
      { title: 'Mastered voiceover audio tracks for client walkthrough tutorial', project: 'Media Production' }
    ]
  };

  const pool = deptPresets[emp.departmentId] || deptPresets.it;
  const timestamps = ['09:30 AM', '11:15 AM', '01:45 PM', '03:10 PM', '04:30 PM', '05:15 PM', '05:45 PM', '06:00 PM'];

  const tasks: EmployeeTaskItem[] = [];
  for (let i = 0; i < total; i++) {
    const preset = pool[i % pool.length];
    const isCompleted = i < completed;
    const isInProgress = i === completed && completed < total;
    const time = timestamps[i % timestamps.length];

    tasks.push({
      id: `${emp.id}-task-${i + 1}`,
      title: i === 0 && emp.deliverableSummary ? emp.deliverableSummary : preset.title,
      project: preset.project,
      timestamp: `${time} BST`,
      status: isCompleted ? 'completed' : isInProgress ? 'in_progress' : 'pending',
      deliverable: isCompleted ? (i === 0 ? emp.deliverableSummary : `Deliverable verified for milestone #${i + 1}`) : undefined,
      deliverableUrl: isCompleted && i === 0 ? 'https://github.com/apexwork/deliverables' : undefined
    });
  }

  return tasks;
}

// ==========================================
// ANTI-EVASION & ACTIVITY DENSITY UTILITIES
// ==========================================

export function getActivityDensityStatus(percent: number): {
  label: 'High Engagement' | 'Moderate Engagement' | 'Ghost Inactivity / Suspicious';
  badgeClass: string;
  color: 'emerald' | 'amber' | 'rose';
  textColor: string;
} {
  if (percent >= 70) {
    return {
      label: 'High Engagement',
      badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      color: 'emerald',
      textColor: 'text-emerald-400'
    };
  }
  if (percent >= 30) {
    return {
      label: 'Moderate Engagement',
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      color: 'amber',
      textColor: 'text-amber-400'
    };
  }
  return {
    label: 'Ghost Inactivity / Suspicious',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse',
    color: 'rose',
    textColor: 'text-rose-400'
  };
}

export function getActivityDensityBarColor(percent: number): string {
  if (percent >= 70) return 'from-cyan-500 to-emerald-400';
  if (percent >= 30) return 'from-amber-500 to-yellow-400';
  return 'from-rose-500 to-red-500';
}

