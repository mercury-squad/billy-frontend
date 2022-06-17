export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3200';

export const API = {
  signup: `${BASE_URL}/api/v1/signup`,
  login: `${BASE_URL}/api/v1/login`,
  logout: `${BASE_URL}/api/v1/logout`,
  user: `${BASE_URL}/api/v1/user/me`,
  confirmEmail: `${BASE_URL}/api/v1/confirmEmail`,
};

export const ROUTES = {
  login: '/login',
  signup: '/signup',
  dashboard: '/',
  welcome: '/welcome',
};
