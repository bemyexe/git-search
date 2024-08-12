import { useSelector } from 'react-redux';
import { Box, Chip, Typography } from '@mui/material';

import { repoCardSelectors } from '../../../../store/repo-card/repo-card.selectors';

import './style.scss';

export const RepoCard = () => {
  const card = useSelector(repoCardSelectors.selectRepoCard);
  const isRepoChosen = useSelector(repoCardSelectors.selectisRepoChosen);
  return (
    <Box className="repo-card">
      {isRepoChosen ? (
        <Box className="repo-card-container">
          <Typography variant="h4">Название репозитория</Typography>
          <Chip label={card?.name} color="primary" />
          {!!card?.description && (
            <Chip className="repo-card-description" label={card?.description} />
          )}
          {!!card?.license?.name && (
            <Typography variant="caption">{card?.license?.name}</Typography>
          )}
        </Box>
      ) : (
        <Box className="no-chosen-repo">
          <Typography>Выберите репоризотрий</Typography>
        </Box>
      )}
    </Box>
  );
};
