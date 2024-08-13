import { Box } from '@mui/material';

import { Header } from './components';
import { MainPage } from './pages';

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
