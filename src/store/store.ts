import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from './filter/filter.slice';
import { repoCardReducer } from './repo-card/repo-card.slice';
import { reposReducer } from './repos/repos.slice';

export const store = configureStore({
  reducer: {
    reposState: reposReducer,
    filterState: filterReducer,
    repoCardState: repoCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
