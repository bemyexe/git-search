import { AxiosError } from 'axios';

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: AxiosError;
  extra: AnyExtraArgumentType;
};
