import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { ReposState } from './repos.slice';

const selectUsersState: (state: RootState) => ReposState = (state) =>
  state.reposState;

const selectReposList = createSelector(
  selectUsersState,
  (state) => state.reposList
);

const selectReposLoading = createSelector(
  selectUsersState,
  (state) => state.reposLoading
);
const selectReposError = createSelector(
  selectUsersState,
  (state) => state.reposError
);

export const reposSelectors = {
  selectReposList,
  selectReposLoading,
  selectReposError,
};
