import { useState } from 'react';
import { AppBar, Avatar, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import useAuth from 'common/hooks/use-auth';
import { DRAWER_WIDTH } from 'common/constants';

const Header = ({ title, handleDrawerToggle }) => {
  const auth = useAuth();
  const [menuTriggerEl, setMenuTriggerEl] = useState(null);

  const openMenu = (event) => {
    setMenuTriggerEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuTriggerEl(null);
  };

  const isMenuOpen = !!menuTriggerEl;

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
      }}>
      <Toolbar className="flex justify-s-between">
        <div className="flex align-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography className="bold" variant="h4" noWrap component="h1">
            {title}
          </Typography>
        </div>
        <div className="flex align-center">
          <Avatar />
          <IconButton onClick={openMenu}>{isMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          <Menu anchorEl={menuTriggerEl} open={isMenuOpen} onClose={closeMenu}>
            <MenuItem
              onClick={() => {
                closeMenu();
                auth.logout();
              }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
