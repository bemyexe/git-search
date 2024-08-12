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
import { formatDate } from '../../../helpers/date-formatter';
import { getComparator } from '../../../helpers/get-comparator';
import { stableSort } from '../../../helpers/stable-sort';
import { useAppDispatch } from '../../../store';
import { filterSelectors } from '../../../store/filter/filter.selectors';
import {
  setOrderValue,
  setPageValue,
  setPerPageValue,
} from '../../../store/filter/filter.slice';
import { setRepoCardValue } from '../../../store/repo-card/repo-card.slice';
import { reposSelectors } from '../../../store/repos/repos.selectors';

import { EnhancedTableHead } from './enhanced-table-head';

import './style.scss';

export const EnhancedTable = () => {
  const dispatch = useAppDispatch();

  // const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Repository>('name');
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const search = useSelector(reposSelectors.selectReposList);
  const order = useSelector(filterSelectors.selectOrderValue);

  const page = useSelector(filterSelectors.selectPageValue);
  const rowsPerPage = useSelector(filterSelectors.selectPerPageValue);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Repository
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    dispatch(setOrderValue(isAsc ? 'desc' : 'asc'));
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

  const visibleRows = React.useMemo(
    () =>
      search &&
      stableSort(search as Repository[], getComparator(order, orderBy)),
    [order, orderBy, page, rowsPerPage, search]
  );
  console.log('aa00', visibleRows);
  const load = useSelector(reposSelectors.selectReposLoading);

  return (
    <Box className="table-wrapper">
      <Paper className="table-paper">
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {load
                ? 'load'
                : visibleRows?.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        className="table-body-row"
                        hover
                        onClick={() => dispatch(setRepoCardValue(row))}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.language}</TableCell>
                        <TableCell align="left">{row.forks_count}</TableCell>
                        <TableCell align="left">
                          {row.stargazers_count}
                        </TableCell>
                        <TableCell align="left">
                          {formatDate(row.updated_at)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
