/* eslint-disable no-underscore-dangle */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from 'react-responsive';
import { Box } from '@mui/material';

import styles from './table.module.scss';

const CustomTable = ({ mobileCaption, columns, rows }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  if (isTabletOrMobile) {
    return (
      <Box className={styles.mobile}>
        <p className="caption">{mobileCaption}</p>
        {rows.map((row) => (
          <Box key={row._id || row.id} className="entry-card">
            {columns.map((column) => (
              <span key={`${row.id}-${column.id}`} className={`${column.id}`}>
                <span className="title">{column.displayName}:&nbsp; </span>
                <span className="description">{column.display(row)}</span>
              </span>
            ))}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer className="table" component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={`header-${column.id}`}>{column.displayName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id || row.id}>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.id}`} width={column.width}>
                  {column.display(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
