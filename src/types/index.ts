// ==================== User ====================
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  avatarUrl?: string;
  name?: string;
  department?: string;
  isActive: boolean;
  theme?: ThemeType;
  colorScheme?: ColorScheme;
}

export type ThemeType = 'light' | 'dark' | 'system';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

// ==================== Candidate ====================
export const CandidateStatus = {
  Applied: 'Applied',
  Screening: 'Screening',
  Technical: 'Technical',
  Cultural: 'Cultural',
  Offer: 'Offer',
  Hired: 'Hired',
  Rejected: 'Rejected'
} as const;

export type CandidateStatus = typeof CandidateStatus[keyof typeof CandidateStatus];

export interface Candidate {
  documents: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: CandidateStatus;
  position: string;
  department?: string;
  source?: string;
  appliedDate: string;
  skills: Skill[];
  resumeUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

// ==================== Interview ====================
export const InterviewStatus = {
  Scheduled: 'Scheduled',
  Confirmed: 'Confirmed',
  Completed: 'Completed',
  Canceled: 'Canceled',
  Rescheduled: 'Rescheduled',
  NoShow: 'No Show',
  InProgress: 'In Progress',
  PendingFeedback: 'Pending Feedback',
} as const;

export type InterviewStatus = typeof InterviewStatus[keyof typeof InterviewStatus];

export const InterviewType = {
  Screening: 'Screening',
  Technical: 'Technical',
  Behavioral: 'Behavioral',
  Cultural: 'Cultural',
  Final: 'Final',
  HR: 'HR',
  Panel: 'Panel',
  Group: 'Group',
  OneOnOne: 'One-on-One',
  CodingAssessment: 'Coding Assessment',
  CaseStudy: 'Case Study',
  PortfolioReview: 'Portfolio Review'
} as const;

export type InterviewType = typeof InterviewType[keyof typeof InterviewType];

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  type: InterviewType;
  status: InterviewStatus;
  date: string;
  startTime: string;
  endTime: string;
  interviewers: string[];
  location?: string;
  videoLink?: string;
  notes?: string;
  timeZone?: string;
  conferencing?: VideoConferencing;
  documents?: Document[];
  feedback?: Feedback[];
  isAiRecommended?: boolean;
}

// ==================== Feedback ====================
export const Recommendation = {
  StrongHire: 'Strong Hire',
  Hire: 'Hire',
  Neutral: 'Neutral',
  NoHire: 'No Hire',
  StrongNoHire: 'Strong No Hire',
} as const;

export type Recommendation = typeof Recommendation[keyof typeof Recommendation];


export interface Feedback {
  id: string;
  interviewId: string;
  evaluatorId: string;
  evaluatorName: string;
  overallRating: number;
  recommendation: Recommendation;
  strengths?: string;
  weaknesses?: string;
  notes?: string;
  submittedAt: string;
  categories?: FeedbackCategory[];
}

export interface FeedbackCategory {
  name: string;
  rating: number;
  comments?: string;
}

// ==================== Offer ====================
export type OfferStatus =
  | 'Draft'
  | 'Pending Approval'
  | 'Approved'
  | 'Sent'
  | 'Accepted'
  | 'Declined'
  | 'Expired';

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  department: string;
  status: OfferStatus;
  salary: number;
  startDate?: string;
  expirationDate: string;
  notes?: string;
}

// ==================== Activity ====================
export interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  subject: string;
  timestamp: string;
}

// ==================== Documents ====================
export type DocumentType =
  | 'Resume'
  | 'Cover Letter'
  | 'Portfolio'
  | 'Certificate'
  | 'Other';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
}

// ==================== Time Slots ====================
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  day: string;
  isAvailable: boolean;
}

// ==================== Video Conferencing ====================
export type VideoConferencingPlatform =
  | 'Zoom'
  | 'Google Meet'
  | 'Microsoft Teams'
  | 'Custom';

export interface VideoConferencing {
  platform: VideoConferencingPlatform;
  link: string;
  meetingId?: string;
  password?: string;
}

// ==================== Advanced Interview ====================
export interface AdvancedInterview extends Interview {
  timeZone: string;
  videoConferencing: VideoConferencing;
  documents: Document[];
  aiRecommendations?: AIRecommendations;
  notifications: NotificationSettings;
  atsIntegration?: ATSIntegration;
}

export interface AIRecommendations {
  recommendedSlots: TimeSlot[];
  recommendedInterviewers: string[];
  recommendedFormat: InterviewType;
  reasonings: string[];
}

export interface NotificationSettings {
  sendEmail: boolean;
  sendSMS: boolean;
  sendPush: boolean;
  reminderTimes: number[]; // hours before interview
}

export interface ATSIntegration {
  system: string;
  syncEnabled: boolean;
  lastSynced?: string;
}

// ==================== Reports ====================
export interface InterviewReport {
  id: string;
  title: string;
  generatedAt: string;
  metrics: {
    totalInterviews: number;
    completionRate: number;
    hireRate: number;
    avgFeedbackScore: number;
    timeToHire: number;
  };
  charts: any[];
  insights: string[];
}
