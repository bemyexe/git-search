import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Box, Typography } from '@mui/material';

import { Repository } from '../../../../@types';
import {
  filterSelectors,
  getRepos,
  repoCardSelectors,
  reposSelectors,
  useAppDispatch,
} from '../../../store';
import { EnhancedTable, Page, RepoCard } from '../../components';

import './style.scss';

export const MainPage = () => {
  const searchValue = useSelector(filterSelectors.selectSearchValue);
  const sort = useSelector(filterSelectors.selectSortValue);
  const order = useSelector(filterSelectors.selectOrderValue);
  const page = useSelector(filterSelectors.selectPageValue);
  const perPage = useSelector(filterSelectors.selectPerPageValue);

  const repos = useSelector(reposSelectors.selectReposList);
  const reposTotalCount = useSelector(reposSelectors.selectReposTotalCount);
  const isLoading = useSelector(reposSelectors.selectReposLoading);
  const isError = useSelector(reposSelectors.selectReposError);

  const repoCard = useSelector(repoCardSelectors.selectRepoCard);
  const isRepoChosen = useSelector(repoCardSelectors.selectisRepoChosen);

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
                  {isError?.response?.data.message}
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
            <RepoCard
              card={repoCard as Repository}
              isRepoChosen={isRepoChosen as boolean}
            />
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
