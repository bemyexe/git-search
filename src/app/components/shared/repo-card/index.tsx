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
          <Chip
            label={card?.description}
            sx={{
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
                padding: '10px',
              },
            }}
          />
          <Typography variant="caption">
            {card?.license?.name || 'No license'}
          </Typography>
        </Box>
      ) : (
        <Typography className="no-repo">Выберите репоризотрий</Typography>
      )}
    </Box>
  );
};
