import { createSlice } from '@reduxjs/toolkit';

import { GitHubRepositoriesResponse } from '../../../@types';

import { getRepos } from './repos.thunk';

export interface ReposState {
  reposRespone?: GitHubRepositoriesResponse;
  reposLoading: boolean;
  reposError?: undefined | string;
}

const REPOS_SLICE_NAME = 'repos-state';

const INITIAL_REPOS_STATE: ReposState = {
  reposRespone: undefined,
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
        state.reposRespone = payload;
      })
      .addCase(getRepos.rejected, (state, { payload }) => {
        state.reposLoading = false;
        state.reposError = payload;
      });
  },
});

export const reposReducer = reposSlice.reducer;
