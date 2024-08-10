import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { RepoCardState } from './repo-card.slice';

const selectRepoCardState: (state: RootState) => RepoCardState = (state) =>
  state.repoCardState;

const selectRepoCard = createSelector(
  selectRepoCardState,
  (state) => state.repoCard
);
const selectisRepoChosen = createSelector(
  selectRepoCardState,
  (state) => state.isRepoChosen
);

export const repoCardSelectors = {
  selectRepoCard,
  selectisRepoChosen,
};
