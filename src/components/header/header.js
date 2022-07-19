import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DRAWER_WIDTH } from 'common/constants';
import { useSelector } from 'react-redux';

const Header = ({ title, handleDrawerToggle, logout }) => {
  const { email } = useSelector((state) => state.user);
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
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
      }}>
      <Toolbar className="flex justify-s-between bg-white" sx={{ height: { xs: '72px' } }}>
        <div className="flex align-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <h1 className="h2">{title}</h1>
        </div>
        <div className="flex align-center">
          <img className="round" src={`https://i.pravatar.cc/40?u=${email}`} alt="profile" />
          <IconButton onClick={openMenu}>{isMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          <Menu anchorEl={menuTriggerEl} open={isMenuOpen} onClose={closeMenu}>
            <MenuItem
              onClick={() => {
                closeMenu();
                logout();
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
