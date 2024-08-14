import { AxiosError } from 'axios';

//типизация createAsyncThunk

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: AxiosError;
  extra: AnyExtraArgumentType;
};
