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
  page: 0,
  per_page: 5,
  sort: 'best match',
  order: 'desc',
};

const filterSlice = createSlice({
  name: FILTER_SLICE_NAME,
  initialState: INITIAL_FILTER_STATE,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setPageValue(state, { payload }) {
      state.page = payload;
    },
    setPerPageValue(state, { payload }) {
      state.per_page = payload;
    },
  },
});

export const { setSearchValue, setPageValue, setPerPageValue } =
  filterSlice.actions;

export const filterReducer = filterSlice.reducer;
