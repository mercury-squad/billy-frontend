import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from 'features/User/Login';
import LangingPage from 'features/LandingPage';
import Dashboard from 'features/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LangingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
