import { Box } from '@mui/material';

import { MainPage } from './pages/main-page';
import { Header } from './components';

import './style.scss';

export const App = () => {
  return (
    <>
      <Header />
      <MainPage />
      <Box component="footer" className="footer" />
    </>
  );
};
