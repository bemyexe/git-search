import * as React from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Repository } from '../../../../@types';
import { reposSelectors } from '../../../store/repos/repos.selectors';

import { EnhancedTableHead } from './enhanced-table-head';
import { useAppDispatch } from '../../../store';
import { filterSelectors } from '../../../store/filter/filter.selectors';
import {
  setPageValue,
  setPerPageValue,
} from '../../../store/filter/filter.slice';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTable {
  className: string;
}

export const EnhancedTable = ({ className }: EnhancedTable) => {
  const dispatch = useAppDispatch();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Repository>('name');
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const search = useSelector(reposSelectors.selectReposList);

  const page = useSelector(filterSelectors.selectPageValue);
  const rowsPerPage = useSelector(filterSelectors.selectPerPageValue);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Repository
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPageValue(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPerPageValue(parseInt(event.target.value, 10)));
    dispatch(setPageValue(0));
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    search && page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - search.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      search &&
      stableSort(search as Repository[], getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, search]
  );
  const load = useSelector(reposSelectors.selectReposLoading);
  if (load) {
    return <div>loading</div>;
  }

  return (
    <Box className={className} sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => (event, row.id)}
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.language}</TableCell>
                    <TableCell align="left">{row.forks_count}</TableCell>
                    <TableCell align="left">{row.stargazers_count}</TableCell>
                    <TableCell align="left">{row.updated_at}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={search?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
