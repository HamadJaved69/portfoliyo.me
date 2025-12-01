// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Users
  USERS: {
    PROFILE: '/users/profile',
    USERNAME: '/users/username',
    DELETE: '/users/account',
    CHANGE_PASSWORD: '/users/change-password',
  },

  // Portfolios
  PORTFOLIOS: {
    MY_PORTFOLIO: '/portfolios/me',
    CREATE: '/portfolios',
    UPDATE: (id: number) => `/portfolios/${id}`,
    DELETE: (id: number) => `/portfolios/${id}`,
    PUBLIC: (slug: string) => `/portfolios/public/${slug}`,
  },

  // Public
  PUBLIC: {
    PORTFOLIO: (username: string) => `/public/portfolio/${username}`,
    TRACK_VIEW: (username: string) => `/public/portfolio/${username}/view`,
  },

  // Analytics
  ANALYTICS: {
    EVENT: '/analytics/event',
    PORTFOLIO_STATS: (id: number) => `/analytics/portfolio/${id}`,
    ADMIN_STATS: '/analytics/admin',
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
  ACCESS_TOKEN: 'portfoliyo_access_token',
  REFRESH_TOKEN: 'portfoliyo_refresh_token',
  USER: 'portfoliyo_user',
  THEME: 'portfoliyo_theme',
} as const;