import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from 'app';
import Login from 'features/user/login';
import Signup from 'features/user/signup';
import Welcome from 'features/welcome';
import Dashboard from 'features/dashboard';
import 'styles/utilities.scss';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
