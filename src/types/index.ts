// Core API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types
export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  username: string;
}

// Portfolio types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary: string;
}

export interface Experience {
  id?: number;
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  id?: number;
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Portfolio {
  id: number;
  userId: number;
  title: string;
  slug: string;
  templateId?: string; // Template identifier (minimal, modern, developer)
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  isPublic: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePortfolioData {
  title: string;
  templateId?: string; // Template identifier
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  isPublic: boolean;
}

// Analytics types
export interface PortfolioStats {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  monthViews: number;
  profileViews: number;
  completionRate: number;
  viewHistory: ViewHistoryItem[];
}

export interface ViewHistoryItem {
  date: string;
  views: number;
}

// Admin types
export interface AdminStats {
  totalUsers: number;
  totalPortfolios: number;
  totalViews: number;
  newUsersToday: number;
  newPortfoliosToday: number;
  recentUsers: User[];
  recentPortfolios: Portfolio[];
}

// Component prop types
export interface AuthFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
  error?: string;
}

export interface PortfolioFormProps {
  initialData?: Partial<CreatePortfolioData>;
  onSave: (data: CreatePortfolioData) => void;
  loading: boolean;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  loading: boolean;
  touched: Set<string>;
}