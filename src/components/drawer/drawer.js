import { Box, List, ListItem, ListItemButton, ListItemIcon, SvgIcon, Drawer } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { NAVIGATION_ITEMS, DRAWER_WIDTH, ROUTES } from 'common/constants';
import LogoSVG from 'assets/img/logo-white.svg';
import Logo from 'components/logo/logo';
import styles from './drawer.module.scss';

const ResponsiveDrawer = ({ mobileOpen, handleDrawerToggle }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const drawer = (
    <List className={styles.menu}>
      <ListItem
        onClick={() => {
          handleDrawerToggle();
          navigate(ROUTES.dashboard);
        }}>
        <Logo source={LogoSVG} />
      </ListItem>
      {NAVIGATION_ITEMS.map(({ name, label, link, icon, pathsInScope }) => (
        <ListItem
          key={name}
          className={pathsInScope.some((path) => new RegExp(path).test(pathname)) ? 'active-item' : ''}
          disablePadding
          onClick={handleDrawerToggle}>
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
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        className={styles.nav}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}>
        {drawer}
      </Drawer>
      <Drawer
        className={styles.nav}
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default ResponsiveDrawer;
