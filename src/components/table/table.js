/* eslint-disable no-underscore-dangle */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from 'react-responsive';
import { Box, Checkbox } from '@mui/material';

import styles from './table.module.scss';
import { ActionsMenu } from '../data-visualization/data-visualization';

const CustomTable = ({ mobileCaption, columns, rows, enableSelection = false, asDesktop = false, actions = [] }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  if (isTabletOrMobile && !asDesktop) {
    return (
      <Box className={styles.mobile}>
        <p className="mobile-caption bodyM bold">{mobileCaption}</p>
        {rows.map((row) => (
          <Box key={row._id || row.id} className="entry-card">
            <div>
              <Checkbox type="checkbox" />
            </div>
            <div className="details">
              {columns.map((column) => (
                <span key={`${row.id}-${column.id}`} className={column.id}>
                  <span className="title">{column.displayName}:&nbsp; </span>
                  <span className="description">{column.display(row)}</span>
                </span>
              ))}
            </div>
            <div>
              <ActionsMenu actions={actions} data={row} />
            </div>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer className={`table ${styles.desktop}`} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {enableSelection && (
              <TableCell key="header-checkbox" className="selectable">
                <Checkbox type="checkbox" />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={`header-${column.id}`} className={column.id} align={column.align || 'left'}>
                {column.displayName}
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell key="header-actions" className="action-button" align="right">
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id || row.id}>
              {enableSelection && (
                <TableCell key={`${row.id}-checkbox`}>
                  <Checkbox type="checkbox" />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.id}`} width={column.width} align={column.align || 'left'}>
                  {column.display(row)}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell key="header-actions" className="action-button" align="right">
                  <ActionsMenu actions={actions} data={row} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
