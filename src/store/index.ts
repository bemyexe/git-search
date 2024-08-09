import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { reposReducer } from './repos/repos.slice';

export const store = configureStore({
  reducer: {
    reposState: reposReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
