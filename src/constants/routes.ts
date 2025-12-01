// Application routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  EXAMPLES: '/examples',
  CREATE_PORTFOLIO: '/start',
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const;

// Reserved route names that cannot be used as usernames
export const RESERVED_ROUTES = [
  'login',
  'signup',
  'dashboard',
  'examples',
  'start',
  'profile',
  'api',
  'admin',
  'www',
  'mail',
  'ftp',
  'blog',
  'shop',
  'store',
  'help',
  'support',
  'about',
  'contact',
  'privacy',
  'terms',
  'pricing'
] as const;

// Helper function to check if a username is reserved
export const isReservedRoute = (username: string): boolean => {
  return RESERVED_ROUTES.includes(username as any);
};