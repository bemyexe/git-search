import {
  getRepositories,
  QueryRepositoriesParams,
} from '../../api/search/repositories';
import { createAppAsyncThunk } from '../../helpers/create-thunk';

export const getRepos = createAppAsyncThunk(
  'repos/getRepos',
  async (params: QueryRepositoriesParams, { rejectWithValue }) => {
    try {
      const response = await getRepositories(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
