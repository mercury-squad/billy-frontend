import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/user/user-slice';
import invoicesReducer from 'features/invoices/invoices-slice';

export default configureStore({
  reducer: { user: userReducer, invoices: invoicesReducer },
});
