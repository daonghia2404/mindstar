import { TManagerState } from '@/redux/reducers/manager';
import { TUpdateManagerSuccess } from '@/redux/actions/manager';

export const updateManagerUpdateState = (state: TManagerState, action: TUpdateManagerSuccess): TManagerState => ({
  ...state,
  updateManagerResponse: action.payload.response,
});
