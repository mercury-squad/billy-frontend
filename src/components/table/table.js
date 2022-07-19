import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from 'react-responsive';
import { Box, Checkbox, IconButton } from '@mui/material';
import { ReactComponent as DeleteIcon } from 'assets/img/delete-icon.svg';

import styles from './table.module.scss';
import { ActionsMenu } from '../data-visualization/data-visualization';

const CustomTable = ({ mobileCaption, columns, rows, onRemoveItems, asDesktop = false, actions = [] }) => {
  const enableSelection = !!onRemoveItems;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [selectedEntries, setSelectedEntries] = useState({});
  const [allSelected, setAllSelected] = useState(false);

  const selectAllEntries = (e) => {
    if (e.target.checked) {
      const data = rows.reduce((acc, { _id: id }) => {
        acc[id] = true;
        return acc;
      }, {});
      setSelectedEntries(data);
      setAllSelected(true);
    } else {
      setSelectedEntries({});
      setAllSelected(false);
    }
  };

  const updateSelectedEntries = (checked, id) => {
    setSelectedEntries(({ [id]: entry, ...rest }) => {
      return {
        ...rest,
        ...(checked ? { [id]: checked } : {}),
      };
    });
  };

  useEffect(() => {
    setSelectedEntries({});
    setAllSelected(false);
  }, [rows]);

  const generalActions = enableSelection && !!Object.keys(selectedEntries).length && (
    <div className={styles.actions}>
      <span className="bodyM bold">{Object.keys(selectedEntries).length} selected</span>
      <span>
        <IconButton component="span" color="primary" onClick={() => onRemoveItems(Object.keys(selectedEntries))}>
          <DeleteIcon />
        </IconButton>
      </span>
    </div>
  );

  if (isTabletOrMobile && !asDesktop) {
    return (
      <Box className={styles.mobile}>
        {generalActions}
        <p className="mobile-caption bodyM bold">
          {enableSelection && (
            <Checkbox className="selectable" type="checkbox" checked={allSelected} onClick={selectAllEntries} />
          )}
          <span>{mobileCaption}</span>
        </p>
        {rows.map((row) => (
          <Box key={row._id || row.id} className="entry-card">
            <div>
              <Checkbox
                type="checkbox"
                checked={!!selectedEntries[row._id]}
                onClick={(e) => updateSelectedEntries(e.target.checked, row._id)}
              />
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
    <>
      {generalActions}
      <TableContainer className={`table ${styles.desktop}`} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {enableSelection && (
                <TableCell key="header-checkbox" className="selectable">
                  <Checkbox type="checkbox" checked={allSelected} onClick={selectAllEntries} />
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
                    <Checkbox
                      type="checkbox"
                      checked={!!selectedEntries[row._id]}
                      onClick={(e) => updateSelectedEntries(e.target.checked, row._id)}
                    />
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
    </>
  );
};

export default CustomTable;
