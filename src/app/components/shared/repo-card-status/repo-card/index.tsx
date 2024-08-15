import { Box, Chip, Typography } from '@mui/material';
import clsx from 'clsx';

import { Repository } from '../../../../../../@types';

import './style.scss';

interface RepoCard {
  card: Repository;
  className?: string;
}

export const RepoCard = ({ card, className }: RepoCard) => {
  return (
    <Box className={clsx('repo-card', className)}>
      <Typography variant="h4">Название репозитория</Typography>
      <Chip label={card?.name} color="primary" />
      {!!card?.description && (
        <Chip className="repo-card-description" label={card?.description} />
      )}
      {!!card?.license?.name && (
        <Typography variant="caption">{card?.license?.name}</Typography>
      )}
    </Box>
  );
};
