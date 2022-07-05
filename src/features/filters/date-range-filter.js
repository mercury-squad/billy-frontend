import { Box, Select, MenuItem, FormControl } from '@mui/material';
import styles from './application-filters.module.scss';

const DateRangeFilter = ({ filtersConfig, className = '' }) => {
  const { rangeValue, rangeOptions, onRangeOptionChange } = filtersConfig;

  return (
    <Box className={`application-filters ${styles.filters} ${className}`}>
      <FormControl size="small">
        <Select className="select bodyM" value={rangeValue} onChange={onRangeOptionChange} displayEmpty>
          {rangeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateRangeFilter;
