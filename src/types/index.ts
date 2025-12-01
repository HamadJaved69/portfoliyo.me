// Core API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  emailVerified: boolean;
  isActive: boolean;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateProfileData {
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// Template types
export type TemplateId = 'minimal' | 'modern' | 'developer';

// Portfolio types
export interface Portfolio {
  id: string;
  userId: string;
  title: string | null;
  bio: string | null;
  tagline: string | null;
  template: TemplateId;
  contactEmail: string | null;
  contactPhone: string | null;
  location: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  twitterUrl: string | null;
  skills: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
}

export interface CreatePortfolioData {
  title?: string;
  bio?: string;
  tagline?: string;
  template?: TemplateId;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  skills?: string[];
}

export interface Project {
  id: string;
  portfolioId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
  featured: boolean;
  order: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description?: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  featured?: boolean;
  order?: number;
  startDate?: string;
  endDate?: string;
}

export interface Experience {
  id: string;
  portfolioId: string;
  company: string;
  position: string;
  description: string | null;
  location: string | null;
  current: boolean;
  order: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExperienceData {
  company: string;
  position: string;
  description?: string;
  location?: string;
  current?: boolean;
  order?: number;
  startDate: string;
  endDate?: string | null;
}

export interface Education {
  id: string;
  portfolioId: string;
  institution: string;
  degree: string;
  field: string | null;
  description: string | null;
  order: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationData {
  institution: string;
  degree: string;
  field?: string;
  description?: string;
  order?: number;
  startDate: string;
  endDate?: string | null;
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