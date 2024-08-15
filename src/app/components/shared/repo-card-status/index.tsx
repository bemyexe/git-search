import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

import { Repository } from '../../../../../@types';
import { repoCardSelectors } from '../../../../store';

import { RepoCard } from './repo-card';

import './style.scss';

interface RepoCardStatusProps {
  isRepoChosen: boolean;
  className?: string;
}

export const RepoCardStatus = ({
  isRepoChosen,
  className,
}: RepoCardStatusProps) => {
  const repoCard = useSelector(repoCardSelectors.selectRepoCard);

  return (
    <Box className={clsx('repo-card-status', className)}>
      {isRepoChosen ? (
        <RepoCard card={repoCard as Repository} />
      ) : (
        <Box className="no-chosen-repo">
          <Typography>Выберите репозиторий</Typography>
        </Box>
      )}
    </Box>
  );
};
