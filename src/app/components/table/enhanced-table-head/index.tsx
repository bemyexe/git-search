import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { headCells } from './head-cells';

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: Sort) => void;
  order: Order;
  orderBy: string;
}

export const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) => {
  const createSortHandler =
    (property: Sort) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.sortQuery ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.sortQuery}
              direction={orderBy === headCell.sortQuery ? order : 'asc'}
              onClick={createSortHandler(headCell.sortQuery as Sort)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
