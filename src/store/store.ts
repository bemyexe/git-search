import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { filterReducer } from './filter';
import { repoCardReducer } from './repo-card';
import { reposReducer } from './repos';

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
