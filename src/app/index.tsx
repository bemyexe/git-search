import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store';
import { reposSelectors } from '../store/repos/repos.selectors';
import { getRepos } from '../store/repos/repos.thunk';

import { Page } from './components/shared/page';
import { Header } from './components';
import EnhancedTable from './components/table';

export const App = () => {
  const dispatch = useAppDispatch();

  const search = useSelector(reposSelectors.selectReposList);
  const load = useSelector(reposSelectors.selectReposLoading);
  const error = useSelector(reposSelectors.selectReposError);

  useEffect(() => {
    dispatch(
      getRepos({
        query: 'eis-table',
        page: 1,
        per_page: 10,
        sort: 'stars',
        order: 'desc',
      })
    );
  }, [dispatch]);
  if (load) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }
  return (
    <>
      <Header />
      <Page withHeader>
        app
        <EnhancedTable />
      </Page>
    </>
  );
};
