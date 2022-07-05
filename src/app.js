import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import useAuth from 'common/hooks/use-auth';
import { ROUTES, DRAWER_WIDTH } from 'common/constants';
import Drawer from 'components/drawer/drawer';
import Header from 'components/header/header';

const App = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate(ROUTES.welcome);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  return (
    <>
      <CssBaseline />
      <Box className="flex h-100">
        <Header title={headerTitle} handleDrawerToggle={handleDrawerToggle} logout={auth.logout} />
        <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box
          className="main-container"
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, mt: '72px' }}>
          <Outlet context={[setHeaderTitle]} />
        </Box>
        {/* TODO: Footer */}
      </Box>
    </>
  );
};

export default App;
