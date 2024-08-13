import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  searchValue: string;
  page: number;
  per_page: number;
  sort: Sort;
  order: Order;
}

const FILTER_SLICE_NAME = 'filter-state';

const INITIAL_FILTER_STATE: FilterState = {
  searchValue: '',
  page: 1,
  per_page: 5,
  sort: 'bestmatch',
  order: 'asc',
};

const filterSlice = createSlice({
  name: FILTER_SLICE_NAME,
  initialState: INITIAL_FILTER_STATE,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setPageValue(state, { payload }) {
      if (payload === 1) {
        state.page = payload + 1;
      }
      state.page = payload;
    },
    setPerPageValue(state, { payload }) {
      state.per_page = payload;
    },
    setSortValue(state, { payload }) {
      state.sort = payload;
    },
    setOrderValue(state, { payload }) {
      state.order = payload;
    },
  },
});

export const {
  setSearchValue,
  setPageValue,
  setPerPageValue,
  setOrderValue,
  setSortValue,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
