import { useState } from 'react';
import { Menu, MenuItem, Select, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from './data-visualization.module.scss';

export const TextWithTag = ({ text, tag, variant = 'primary' }) => {
  return (
    <span className={`bold ${styles.textWithTag}`}>
      <span>{text}</span>
      <span className={`tag caption ${variant}`}>{tag}</span>
    </span>
  );
};

export const Status = ({ value, options, onChange }) => {
  return (
    <Select
      className={`select bodyM ${styles.status}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export const ActionsMenu = ({ actions }) => {
  const [menuTriggerEl, setMenuTriggerEl] = useState(null);
  const isMenuOpen = !!menuTriggerEl;

  const openMenu = (event) => {
    setMenuTriggerEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuTriggerEl(null);
  };

  return (
    <>
      <IconButton component="span" color="primary" onClick={openMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={menuTriggerEl} open={isMenuOpen} onClose={closeMenu}>
        {actions.map((action) => (
          <MenuItem
            key={action.value}
            onClick={() => {
              closeMenu();
            }}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
