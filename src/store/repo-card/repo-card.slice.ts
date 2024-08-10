import { createSlice } from '@reduxjs/toolkit';

import { Data } from '../../../@types';

export interface RepoCardState {
  repoCard?: Data;
  isRepoChosen?: boolean;
}

const REPO_CARD_SLICE_NAME = 'repo-card-state';

const INITIAL_REPO_CARD_STATE: RepoCardState = {
  repoCard: undefined,
  isRepoChosen: false,
};

const repoCardSlice = createSlice({
  name: REPO_CARD_SLICE_NAME,
  initialState: INITIAL_REPO_CARD_STATE,
  reducers: {
    setRepoCardValue(state, { payload }) {
      state.repoCard = payload;
      state.isRepoChosen = true;
    },
  },
});

export const { setRepoCardValue } = repoCardSlice.actions;

export const repoCardReducer = repoCardSlice.reducer;
