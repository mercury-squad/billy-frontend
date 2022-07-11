import { MenuItem, Select } from '@mui/material';
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
