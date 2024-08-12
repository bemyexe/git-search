import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { filterSelectors } from '../../../store/filter/filter.selectors';
import { Page } from '../../components';
import { RepoCard } from '../../components/shared/repo-card';
import { EnhancedTable } from '../../components/table';

import './style.scss';

export const MainPage = () => {
  const searchValue = useSelector(filterSelectors.selectSearchValue);
  return (
    <Page className="main-page" withHeader withFooter>
      <Box className="main-page-container" component="section">
        {searchValue ? (
          <>
            <Box className="main-page-content">
              <Typography variant="h3">Результаты поиска</Typography>
              <EnhancedTable />
            </Box>
            <RepoCard />
          </>
        ) : (
          <>
            <Box className="main-page-welcome">
              <Typography className="main-page-welcome-title" variant="h3">
                Добро пожаловать
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Page>
  );
};
