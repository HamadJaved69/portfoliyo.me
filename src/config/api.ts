// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // Portfolio
  PORTFOLIO: {
    CREATE: '/portfolio',
    ME: '/portfolio/me',
    UPDATE: '/portfolio',
    DELETE: '/portfolio',
    PUBLISH: '/portfolio/publish',
    PUBLIC: (username: string) => `/portfolio/public/${username}`,
    PUBLIC_BY_ID: (userId: string) => `/portfolio/public/id/${userId}`,
  },

  // Projects
  PROJECTS: {
    CREATE: '/portfolio/projects',
    UPDATE: (projectId: string) => `/portfolio/projects/${projectId}`,
    DELETE: (projectId: string) => `/portfolio/projects/${projectId}`,
  },

  // Experiences
  EXPERIENCES: {
    CREATE: '/portfolio/experiences',
    UPDATE: (experienceId: string) => `/portfolio/experiences/${experienceId}`,
    DELETE: (experienceId: string) => `/portfolio/experiences/${experienceId}`,
  },

  // Education
  EDUCATION: {
    CREATE: '/portfolio/education',
    UPDATE: (educationId: string) => `/portfolio/education/${educationId}`,
    DELETE: (educationId: string) => `/portfolio/education/${educationId}`,
  },
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'portfoliyo_token',
  USER: 'portfoliyo_user',
  THEME: 'portfoliyo_theme',
} as const;