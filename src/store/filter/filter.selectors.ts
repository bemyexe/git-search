import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

import { FilterState } from './filter.slice';

const selectFilterState: (state: RootState) => FilterState = (state) =>
  state.filterState;

const selectSearchValue = createSelector(
  selectFilterState,
  (state) => state.searchValue
);

const selectPageValue = createSelector(
  selectFilterState,
  (state) => state.page
);

const selectPerPageValue = createSelector(
  selectFilterState,
  (state) => state.per_page
);

export const filterSelectors = {
  selectSearchValue,
  selectPageValue,
  selectPerPageValue,
};
