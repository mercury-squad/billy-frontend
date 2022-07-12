import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CustomTable = ({ columns, rows }) => {
  return (
    <TableContainer className="table" component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={`header-${column.field}`}>{column.displayName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            // eslint-disable-next-line no-underscore-dangle
            <TableRow key={row._id || row.id}>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.field}`} width={column.width}>
                  {typeof row[column.field]== 'string' && row[column.field].includes('\n')? 
                  row[column.field].split('\n').map((item, i) => <p key={i}>{item}</p>)
                  : row[column.field]
                  //jsx new line reference: https://www.jsdiaries.com/how-to-create-a-new-line-in-jsx-and-reactjs/
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/*
<TableBody>
          {rows.map((row) => (
            // eslint-disable-next-line no-underscore-dangle
            <TableRow key={row._id || row.id}>
              {columns.map((column) => ( typeof column == 'string'?
                <TableCell key={`${row.id}-${column.field}`} width={column.width}>
                  {row[column.field]}
                </TableCell>
              : Object.keys(column).map( function(key, value) { 
                <TableCell key={`${row.id}-${key}`} >
                  {column[key]}
                </TableCell>
                })
              
              ))
              }
            </TableRow>
          ))}
        </TableBody>
*/

export default CustomTable;
