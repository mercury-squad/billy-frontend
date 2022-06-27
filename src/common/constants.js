import { ReactComponent as DashboardIcon } from 'assets/img/dashboard-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/img/invoice-icon.svg';
import { ReactComponent as ProjectIcon } from 'assets/img/project-icon.svg';

export const DRAWER_WIDTH = 217;

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
  invoices: '/invoices',
  projects: '/projects',
};

export const NAVIGATION_ITEMS = [
  { name: 'dashboard', label: 'Dashboard', link: ROUTES.dashboard, icon: DashboardIcon },
  { name: 'invoices', label: 'Invoices', link: ROUTES.invoices, icon: InvoiceIcon },
  { name: 'projects', label: 'Projects', link: ROUTES.projects, icon: ProjectIcon },
];
