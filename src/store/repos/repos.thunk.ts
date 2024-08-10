import { getRepositories } from '../../api/search/repositories';
import { createAppAsyncThunk } from '../../helpers/create-thunk';

export const getRepos = createAppAsyncThunk(
  'repos/getRepos',
  async (
    params: {
      query: string;
      page: number;
      per_page: number;
      order: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getRepositories(
        params.query,
        params.page,
        params.per_page,
        params.order
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);
