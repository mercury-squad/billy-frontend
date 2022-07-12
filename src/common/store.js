import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/user/user-slice';
import invoicesReducer from 'features/invoices/invoices-slice';
import projectsReducer from 'features/projects/projects-slice';
import dashboardReducer from 'features/dashboard/dashboard-slice';

export default configureStore({
  reducer: { user: userReducer, invoices: invoicesReducer, projects: projectsReducer, summary: dashboardReducer },
});
