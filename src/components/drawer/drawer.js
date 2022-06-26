import { Box, List, ListItem, ListItemButton, Drawer } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { NAVIGATION_ITEMS, DRAWER_WIDTH } from 'common/constants';
import Logo from 'components/logo';

const ResponsiveDrawer = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const drawer = (
    <List>
      <ListItem>
        <Logo />
      </ListItem>
      {NAVIGATION_ITEMS.map(({ name, label, link }) => (
        <ListItem key={name} className={link === location.pathname ? 'active-item' : ''} disablePadding>
          <NavLink className="w-100 disable-link-styles" to={link}>
            <ListItemButton>{label}</ListItemButton>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}>
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default ResponsiveDrawer;
