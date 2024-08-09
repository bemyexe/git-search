export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: AnyErrorType;
  extra: AnyExtraArgumentType;
};
