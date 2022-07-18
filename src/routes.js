import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from 'app';
import Login from 'features/user/login';
import Signup from 'features/user/signup';
import VerifyAccount from 'features/user/verify-account';
import Welcome from 'features/welcome';
import Dashboard from 'features/dashboard';
import Invoices, { InvoiceForm, InvoicePreview } from 'features/invoices';
import Projects from 'features/projects';
import SentInvoice from 'features/invoices/sent-invoice/sent-invoice';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/new" element={<InvoiceForm />} />
          <Route path="invoices/edit" element={<InvoiceForm />} />
          <Route path="invoices/:id" element={<InvoicePreview />} />
          <Route path="invoices/sent" element={<SentInvoice />} />
          <Route path="projects" element={<Projects />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="confirmEmail" element={<VerifyAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
