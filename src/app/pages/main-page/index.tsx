import { Box } from '@mui/material';

import { Page } from '../../components';
import { RepoCard } from '../../components/shared/repo-card';
import { EnhancedTable } from '../../components/table';

import './style.scss';

export const MainPage = () => {
  return (
    <Page className="main-page" withHeader>
      <Box className="main-page-container" component="section">
        <EnhancedTable className="main-page-table" />
        <RepoCard />
      </Box>
    </Page>
  );
};
