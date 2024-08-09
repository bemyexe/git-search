import { Repository } from '../../../../../../@types';

interface HeadCell {
  id: keyof Repository;
  label: string;
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
  },
  {
    id: 'stargazers_count',
    label: 'Число звезд',
  },
  {
    id: 'updated_at',
    label: 'Дата обновления',
  },
];
