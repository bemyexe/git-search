import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store';
import { reposSelectors } from '../store/repos/repos.selectors';
import { getRepos } from '../store/repos/repos.thunk';

import { Page } from './components/shared/page';
import EnhancedTable from './components/table';
import { Header } from './components';

export const App = () => {
  const load = useSelector(reposSelectors.selectReposLoading);
  const error = useSelector(reposSelectors.selectReposError);
  // const search = useSelector(reposSelectors.selectReposList);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(
  //     getRepos({
  //       query: 'eis-table',
  //       page: 1,
  //       per_page: 10,
  //       sort: 'stars',
  //       order: 'desc',
  //     })
  //   );
  // }, [dispatch]);
  // console.log(search);

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
