import { Box, List, ListItem, ListItemButton, ListItemIcon, SvgIcon, Drawer } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { NAVIGATION_ITEMS, DRAWER_WIDTH } from 'common/constants';
import LogoSVG from 'assets/img/logo-white.svg';
import Logo from 'components/logo/logo';
import styles from './drawer.module.scss';

const ResponsiveDrawer = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const drawer = (
    <List className={styles.menu}>
      <ListItem>
        <Logo source={LogoSVG} />
      </ListItem>
      {NAVIGATION_ITEMS.map(({ name, label, link, icon }) => (
        <ListItem key={name} className={link === location.pathname ? 'active-item' : ''} disablePadding>
          <NavLink className="w-100 disable-link-styles action" to={link}>
            <ListItemButton>
              <ListItemIcon>
                <SvgIcon component={icon} viewBox="0 0 144 144" />
              </ListItemIcon>
              {label}
            </ListItemButton>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
      <Drawer
        className={styles.nav}
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
        className={styles.nav}
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
