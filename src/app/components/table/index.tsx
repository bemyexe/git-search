import * as React from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Repository } from '../../../../@types';
import { formatDate } from '../../../helpers';
import {
  setOrderValue,
  setPageValue,
  setPerPageValue,
  setRepoCardValue,
  setSortValue,
  useAppDispatch,
} from '../../../store';

import { EnhancedTableHead } from './enhanced-table-head';

import './style.scss';

interface EnhancedTableProps {
  sort: Sort;
  order: Order;
  repos: Repository[];
  reposTotalCount: number;
  page: number;
  rowsPerPage: number;
  isLoading: boolean;
}

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
const PARSE_INT_RADIX = 10;

export const EnhancedTable = ({
  sort,
  order,
  repos,
  reposTotalCount,
  page,
  rowsPerPage,
  isLoading,
}: EnhancedTableProps) => {
  const dispatch = useAppDispatch();

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: Sort
  ) => {
    const isAsc = sort === property && order === 'asc';
    dispatch(setOrderValue(isAsc ? 'desc' : 'asc'));
    dispatch(setSortValue(property));
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setPageValue(newPage + 1));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPerPageValue(parseInt(event.target.value, PARSE_INT_RADIX)));
    dispatch(setPageValue(1));
  };

  return (
    <Box className="table-wrapper">
      <Paper className="table-paper">
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={sort}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              ) : (
                repos?.map((row, index) => {
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
                      <TableCell align="left">{row.stargazers_count}</TableCell>
                      <TableCell align="left">
                        {formatDate(row.updated_at)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={reposTotalCount ?? 0}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
