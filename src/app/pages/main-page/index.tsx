import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Box, Typography } from '@mui/material';

import { Repository } from '../../../../@types';
import { useAppDispatch } from '../../../store';
import { filterSelectors } from '../../../store/filter/filter.selectors';
import { reposSelectors } from '../../../store/repos/repos.selectors';
import { getRepos } from '../../../store/repos/repos.thunk';
import { Page } from '../../components';
import { RepoCard } from '../../components/shared/repo-card';
import { EnhancedTable } from '../../components/table';

import './style.scss';

export const MainPage = () => {
  const searchValue = useSelector(filterSelectors.selectSearchValue);
  const sort = useSelector(filterSelectors.selectSortValue);
  const order = useSelector(filterSelectors.selectOrderValue);
  const repos = useSelector(reposSelectors.selectReposList);
  const reposTotalCount = useSelector(reposSelectors.selectReposTotalCount);
  const page = useSelector(filterSelectors.selectPageValue);
  const perPage = useSelector(filterSelectors.selectPerPageValue);
  const isLoading = useSelector(reposSelectors.selectReposLoading);

  const isError = useSelector(reposSelectors.selectReposError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchValue) {
      dispatch(
        getRepos({
          query: searchValue,
          page: page,
          per_page: perPage,
          sort: sort,
          order: order,
        })
      );
    }
  }, [dispatch, searchValue, page, perPage, order, sort]);

  return (
    <Page className="main-page" withHeader withFooter>
      <Box className="main-page-container" component="section">
        {searchValue ? (
          <>
            <Box className="main-page-content">
              <Typography variant="h3">Результаты поиска</Typography>
              {!!isError && (
                <Alert variant="filled" severity="error">
                  {isError}
                </Alert>
              )}
              <EnhancedTable
                sort={sort}
                order={order}
                repos={repos as Repository[]}
                reposTotalCount={reposTotalCount as number}
                page={page}
                rowsPerPage={perPage}
                isLoading={isLoading}
              />
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
