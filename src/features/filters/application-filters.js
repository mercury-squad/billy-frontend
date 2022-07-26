import { Box, Button, Input, InputAdornment, Select, MenuItem, FormControl, Fab } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import styles from './application-filters.module.scss';

const ApplicationFilters = ({ actionButtonConfig, filtersConfig, className = '' }) => {
  const { label, onClick } = actionButtonConfig;
  const { sortValue, searchValue, sortOptions, onSortOptionChange, onSearchChange } = filtersConfig;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <Box className={`application-filters ${styles.filters} ${className}`}>
      {isTabletOrMobile ? (
        <Fab color="primary" aria-label="add" className="mobile-add-button" onClick={onClick}>
          <AddIcon />
        </Fab>
      ) : (
        <Button size="large" className="button" variant="contained" onClick={onClick}>
          <AddIcon />
          {label}
        </Button>
      )}
      <Input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by project name"
        className="bodyM"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <FormControl size="small">
        <Select
          className="select bodyM"
          value={sortValue}
          onChange={(e) => onSortOptionChange(e.target.value)}
          displayEmpty>
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
