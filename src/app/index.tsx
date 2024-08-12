import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { useAppDispatch } from '../store';
import { filterSelectors } from '../store/filter/filter.selectors';
import { reposSelectors } from '../store/repos/repos.selectors';
import { getRepos } from '../store/repos/repos.thunk';

import { MainPage } from './pages/main-page';
import { Header } from './components';

import './style.scss';

export const App = () => {
  const error = useSelector(reposSelectors.selectReposError);
  const search = useSelector(reposSelectors.selectReposList);
  const searchValue = useSelector(filterSelectors.selectSearchValue);
  const page = useSelector(filterSelectors.selectPageValue);
  const per_page = useSelector(filterSelectors.selectPerPageValue);
  const order = useSelector(filterSelectors.selectOrderValue);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getRepos({
        query: searchValue,
        page: page,
        per_page: per_page,
        order: order,
      })
    );
  }, [dispatch, searchValue, page, per_page, order]);
  console.log(search);
  return (
    <>
      <Header />
      <MainPage />
      <Box component="footer" className="footer" />
      {error && <h1>{error}</h1>}
    </>
  );
};
