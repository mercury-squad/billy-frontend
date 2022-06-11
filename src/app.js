import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';

const App = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate(ROUTES.welcome);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  return (
    <>
      <CssBaseline />
      <header>
        Header
        <Button onClick={auth.logout}>Logout</Button>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default App;
