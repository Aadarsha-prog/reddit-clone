export const APP_ROUTES = {
  HOME: '/',
  POST: {
    CREATE: '/post/create',
    VIEW: (id: string) => `/post/${id}` as const,
    EDIT: (id: string) => `/post/${id}/edit` as const,
  },
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  DASHBOARD: '/dashboard',
} as const;
