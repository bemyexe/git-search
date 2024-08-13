import { RepositoryTable } from '../../../../../../@types';

interface HeadCell {
  id: keyof RepositoryTable;
  label: string;
  sortQuery?: Sort;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Название',
  },
  {
    id: 'language',
    label: 'Язык',
  },
  {
    id: 'forks_count',
    label: 'Число форков',
    sortQuery: 'forks',
  },
  {
    id: 'stargazers_count',
    label: 'Число звезд',
    sortQuery: 'stars',
  },
  {
    id: 'updated_at',
    label: 'Дата обновления',
    sortQuery: 'updated',
  },
];
