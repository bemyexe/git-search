import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { RepoCardState } from './repo-card.slice';

const selectFilterState: (state: RootState) => RepoCardState = (state) =>
  state.repoCardState;

const selectRepoCard = createSelector(
  selectFilterState,
  (state) => state.repoCard
);

export const filterSelectors = {
  selectRepoCard,
};
