import { Box } from '@mui/material';

import { SearchPanel } from '../shared/search-panel';

import './style.scss';

export const Header = () => {
  return (
    <Box component="header" className="header">
      <SearchPanel />
    </Box>
  );
};
