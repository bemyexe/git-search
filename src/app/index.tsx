import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store';
import { filterSelectors } from '../store/filter/filter.selectors';
import { reposSelectors } from '../store/repos/repos.selectors';
import { getRepos } from '../store/repos/repos.thunk';

import { MainPage } from './pages/main-page';
import { Header } from './components';

export const App = () => {
  const load = useSelector(reposSelectors.selectReposLoading);
  const error = useSelector(reposSelectors.selectReposError);
  const search = useSelector(reposSelectors.selectReposList);
  const searchValue = useSelector(filterSelectors.selectSearchValue);
  const page = useSelector(filterSelectors.selectPageValue);
  const per_page = useSelector(filterSelectors.selectPerPageValue);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getRepos({
        query: 'Q' + searchValue,
        page: page,
        per_page: 30,
        order: 'desc',
      })
    );
  }, [dispatch, searchValue, page, per_page]);
  console.log(search);
  if (load) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }
  return (
    <>
      <Header />
      <MainPage />
    </>
  );
};
