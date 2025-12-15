import { create } from 'zustand';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  matchPercentage: number;
  amount: string;
  deadline: string;
  daysLeft: number;
  location: string;
  tags: string[];
  description: string;
  eligibility: {
    ruleBased: Record<string, { required: string | number; met: boolean; userValue: string | number }>;
    aiBased: Record<string, { score: number; reason: string }>;
  };
}

export interface Notification {
  id: string;
  type: 'match' | 'deadline' | 'system' | 'profile';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  scholarshipId?: string;
}

export interface Application {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  appliedDate?: Date;
  deadline: Date;
  notes: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  institution: string;
  gpa: number;
  degreeLevel: string;
  field: string;
  nationality: string;
  skills: string[];
  resumeUploaded: boolean;
  profileStrength: number;
  completedSections: string[];
  pendingSections: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  scholarships: Scholarship[];
  notifications: Notification[];
  applications: Application[];
  chatMessages: ChatMessage[];
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  
  // Actions
  login: (user: Partial<UserProfile>) => void;
  logout: () => void;
  setUser: (user: Partial<UserProfile>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addApplication: (application: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  updateProfileStrength: () => void;
}

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Gates Millennium Scholarship',
    provider: 'Bill & Melinda Gates Foundation',
    matchPercentage: 95,
    amount: '$50,000/year',
    deadline: 'Oct 15, 2025',
    daysLeft: 7,
    location: 'USA',
    tags: ['STEM', 'Full Tuition', 'Merit-Based'],
    description: 'The Gates Millennium Scholars Program selects 1,000 talented students each year to receive a good-through-graduation scholarship to use at any college or university of their choice.',
    eligibility: {
      ruleBased: {
        gpa: { required: 3.0, met: true, userValue: 3.7 },
        nationality: { required: 'US Citizen', met: false, userValue: 'Pakistani' },
        degreeLevel: { required: 'Undergraduate', met: true, userValue: "Bachelor's" },
      },
      aiBased: {
        fieldMatch: { score: 92, reason: 'Computer Science matches STEM requirement' },
        skillsMatch: { score: 88, reason: 'Python, ML skills align with tech focus' },
        leadershipPotential: { score: 85, reason: 'Project leadership experience detected' },
      },
    },
  },
  {
    id: '2',
    name: 'Fulbright Foreign Student Program',
    provider: 'U.S. Department of State',
    matchPercentage: 88,
    amount: '$45,000',
    deadline: 'Oct 22, 2025',
    daysLeft: 14,
    location: 'Global',
    tags: ['Research', 'Graduate', 'International'],
    description: 'The Fulbright Program offers grants for individually designed study/research projects or for English Teaching Assistant Programs.',
    eligibility: {
      ruleBased: {
        degree: { required: "Bachelor's completed", met: true, userValue: 'In progress' },
        language: { required: 'English proficiency', met: true, userValue: 'TOEFL 105' },
        researchProposal: { required: 'Required', met: false, userValue: 'Not prepared' },
      },
      aiBased: {
        researchExperience: { score: 85, reason: 'Previous research projects detected' },
        academicFit: { score: 90, reason: 'Strong GPA and institution reputation' },
        culturalExchange: { score: 80, reason: 'International background and adaptability' },
      },
    },
  },
  {
    id: '3',
    name: 'PEEF Scholarship',
    provider: 'Punjab Educational Endowment Fund',
    matchPercentage: 78,
    amount: 'Full Tuition',
    deadline: 'Nov 30, 2025',
    daysLeft: 52,
    location: 'Pakistan',
    tags: ['Need-Based', 'Merit-Based', 'Local'],
    description: 'PEEF provides scholarships to talented students from low-income families in Punjab, Pakistan.',
    eligibility: {
      ruleBased: {
        nationality: { required: 'Pakistani', met: true, userValue: 'Pakistani' },
        financialNeed: { required: 'Demonstrated need', met: true, userValue: 'Medium income' },
        gpa: { required: 3.5, met: true, userValue: 3.7 },
      },
      aiBased: {
        regionalRelevance: { score: 95, reason: 'From Punjab region' },
        academicConsistency: { score: 88, reason: 'Consistent academic performance' },
        extracurricular: { score: 75, reason: 'Moderate extracurricular involvement' },
      },
    },
  },
  {
    id: '4',
    name: 'Chevening Scholarship',
    provider: 'UK Government',
    matchPercentage: 82,
    amount: 'Full Funding',
    deadline: 'Nov 5, 2025',
    daysLeft: 28,
    location: 'UK',
    tags: ['Graduate', 'Leadership', 'International'],
    description: 'Chevening is the UK government international awards programme aimed at developing global leaders.',
    eligibility: {
      ruleBased: {
        workExperience: { required: '2 years', met: true, userValue: '2.5 years' },
        degreeLevel: { required: "Master's", met: true, userValue: "Master's" },
        returnHome: { required: 'Commitment required', met: true, userValue: 'Agreed' },
      },
      aiBased: {
        leadershipQuality: { score: 87, reason: 'Strong leadership indicators in profile' },
        careerPotential: { score: 82, reason: 'Clear career trajectory' },
        networkingAbility: { score: 78, reason: 'Community involvement detected' },
      },
    },
  },
  {
    id: '5',
    name: 'DAAD Scholarship',
    provider: 'German Academic Exchange Service',
    matchPercentage: 73,
    amount: '€1,200/month',
    deadline: 'Dec 15, 2025',
    daysLeft: 68,
    location: 'Germany',
    tags: ['Research', 'Graduate', 'STEM'],
    description: 'DAAD scholarships provide highly qualified graduates with opportunities for postgraduate studies in Germany.',
    eligibility: {
      ruleBased: {
        gpa: { required: 3.0, met: true, userValue: 3.7 },
        germanLanguage: { required: 'B1 Level', met: false, userValue: 'A2 Level' },
        fieldMatch: { required: 'STEM', met: true, userValue: 'Computer Science' },
      },
      aiBased: {
        academicExcellence: { score: 90, reason: 'Outstanding academic record' },
        researchAlignment: { score: 75, reason: 'Research interests match German institutions' },
        internationalMindset: { score: 80, reason: 'Previous international experience' },
      },
    },
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'match',
    title: 'New Scholarship Match!',
    message: 'Gates Millennium Scholarship matches 95% with your profile',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    scholarshipId: '1',
  },
  {
    id: '2',
    type: 'deadline',
    title: 'Deadline Reminder',
    message: 'Gates Millennium Scholarship deadline in 7 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    scholarshipId: '1',
  },
  {
    id: '3',
    type: 'profile',
    title: 'Complete Your Profile',
    message: 'Add your experience to improve match accuracy by 15%',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to ScholarBuzz!',
    message: 'Start by completing your profile to get personalized matches',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
  },
];

const mockApplications: Application[] = [
  {
    id: '1',
    scholarshipId: '2',
    scholarshipName: 'Fulbright Foreign Student Program',
    status: 'submitted',
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    notes: 'Submitted all documents. Waiting for interview invitation.',
  },
  {
    id: '2',
    scholarshipId: '4',
    scholarshipName: 'Chevening Scholarship',
    status: 'draft',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28),
    notes: 'Need to complete essays and get references.',
  },
];

const mockUser: UserProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  phone: '+1 (555) 123-4567',
  institution: 'Stanford University',
  gpa: 3.7,
  degreeLevel: "Bachelor's",
  field: 'Computer Science',
  nationality: 'Pakistani',
  skills: ['Python', 'Machine Learning', 'React', 'Research', 'Leadership', 'Data Analysis'],
  resumeUploaded: true,
  profileStrength: 75,
  completedSections: ['Personal Info', 'Academic Info', 'Skills'],
  pendingSections: ['Experience', 'Resume Details', 'Achievements'],
};

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  scholarships: mockScholarships,
  notifications: mockNotifications,
  applications: mockApplications,
  chatMessages: [],
  sidebarOpen: true,
  mobileSidebarOpen: false,

  login: (userData) => set({ 
    user: { ...mockUser, ...userData } as UserProfile,
    isAuthenticated: true,
  }),

  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
  }),

  setUser: (updates) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updates } : null
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
      },
      ...state.notifications,
    ],
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  clearAllNotifications: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),

  addApplication: (application) => set((state) => ({
    applications: [
      ...state.applications,
      { ...application, id: Date.now().toString() },
    ],
  })),

  updateApplication: (id, updates) => set((state) => ({
    applications: state.applications.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    ),
  })),

  addChatMessage: (message) => set((state) => ({
    chatMessages: [
      ...state.chatMessages,
      { ...message, id: Date.now().toString(), timestamp: new Date() },
    ],
  })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),

  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),

  updateProfileStrength: () => {
    const user = get().user;
    if (!user) return;
    const sections = [
      'Personal Info',
      'Academic Info',
      'Skills',
      'Experience',
      'Resume Details',
      'Achievements',
    ];
    const completed = user.completedSections.length;
    const total = sections.length;
    const strength = Math.round((completed / total) * 100);
    set((state) => ({
      user: state.user ? { ...state.user, profileStrength: strength } : null,
    }));
  },
}));
