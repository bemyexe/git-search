import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkApiConfig } from '../../@types/thunk-api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
