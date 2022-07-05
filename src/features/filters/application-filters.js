import { Box, Button, Input, InputAdornment, Select, MenuItem, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import styles from './application-filters.module.scss';

const ApplicationFilters = ({ actionButtonConfig, filtersConfig, className = '' }) => {
  const { label, onClick } = actionButtonConfig;
  const { sortValue, searchValue, sortOptions, onSortOptionChange, onSearchChange } = filtersConfig;

  return (
    <Box className={`application-filters ${styles.filters} ${className}`}>
      <Button size="large" className="button" variant="contained" onClick={onClick}>
        <AddIcon />
        {label}
      </Button>
      <Input
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search by project name"
        className="bodyM"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <FormControl size="small">
        <Select className="select bodyM" value={sortValue} onChange={onSortOptionChange} displayEmpty>
          <MenuItem className="bodyM" value="">
            Sort By
          </MenuItem>
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ApplicationFilters;
