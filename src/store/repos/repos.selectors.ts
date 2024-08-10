import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { ReposState } from './repos.slice';

const selecReposState: (state: RootState) => ReposState = (state) =>
  state.reposState;

const selectReposList = createSelector(
  selecReposState,
  (state) => state.reposList
);

const selectReposLoading = createSelector(
  selecReposState,
  (state) => state.reposLoading
);
const selectReposError = createSelector(
  selecReposState,
  (state) => state.reposError
);

export const reposSelectors = {
  selectReposList,
  selectReposLoading,
  selectReposError,
};
