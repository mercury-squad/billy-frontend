import { ReactComponent as DashboardIcon } from 'assets/img/dashboard-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/img/invoice-icon.svg';
import { ReactComponent as ProjectIcon } from 'assets/img/project-icon.svg';
import { ReactComponent as ClientIcon } from 'assets/img/client-icon.svg';

export const DRAWER_WIDTH = 217;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://invoice-billy.herokuapp.com' : 'http://localhost:3200';

export const API = {
  signup: `${BASE_URL}/api/v1/signup`,
  login: `${BASE_URL}/api/v1/login`,
  logout: `${BASE_URL}/api/v1/logout`,
  user: `${BASE_URL}/api/v1/user/me`,
  confirmEmail: `${BASE_URL}/api/v1/confirmEmail`,
  invoices: `${BASE_URL}/api/v1/invoice`,
  projects: `${BASE_URL}/api/v1/project`,
  clients: `${BASE_URL}/api/v1/client`,
  dashboard: `${BASE_URL}/api/v1/dashboard`,
};

export const ROUTES = {
  login: '/login',
  signup: '/signup',
  dashboard: '/',
  welcome: '/welcome',
  invoices: '/invoices',
  newInvoice: '/invoices/new',
  editInvoice: '/invoices/edit',
  sentInvoice: '/invoices/sent',
  projects: '/projects',
  newProjects: '/projects/new',
  clients: '/clients',
  newClients: '/clients/new',
};

export const NAVIGATION_ITEMS = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    link: ROUTES.dashboard,
    pathsInScope: [`${ROUTES.dashboard}$`],
    icon: DashboardIcon,
  },
  {
    name: 'invoices',
    label: 'Invoices',
    link: ROUTES.invoices,
    pathsInScope: [`${ROUTES.invoices}/?.*`],
    icon: InvoiceIcon,
  },
  {
    name: 'projects',
    label: 'Projects',
    link: ROUTES.projects,
    pathsInScope: [`${ROUTES.projects}/?.*`],
    icon: ProjectIcon,
  },
  {
    name: 'clients',
    label: 'Clients',
    link: ROUTES.clients,
    pathsInScope: [`${ROUTES.clients}/?.*`],
    icon: ClientIcon,
  },
];
