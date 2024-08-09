import { createSlice } from '@reduxjs/toolkit';

import { Data } from '../../../@types';

import { getRepos } from './repos.thunk';

export interface ReposState {
  reposList?: Data[];
  reposLoading: boolean;
  reposError?: undefined | string;
}

const REPOS_SLICE_NAME = 'repos-state';

const INITIAL_REPOS_STATE: ReposState = {
  reposList: undefined,
  reposLoading: false,
  reposError: undefined,
};

const reposSlice = createSlice({
  name: REPOS_SLICE_NAME,
  initialState: INITIAL_REPOS_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepos.pending, (state) => {
        state.reposLoading = true;
        state.reposError = undefined;
      })
      .addCase(getRepos.fulfilled, (state, { payload }) => {
        state.reposLoading = false;
        state.reposList = payload;
      })
      .addCase(getRepos.rejected, (state, { payload }) => {
        state.reposLoading = false;
        state.reposError = payload;
      });
  },
});

export const reposReducer = reposSlice.reducer;
