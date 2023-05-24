import { TManagerState } from '@/redux/reducers/manager';
import { TGetManagerSuccess } from '@/redux/actions/manager';

export const getManagerUpdateState = (state: TManagerState, action: TGetManagerSuccess): TManagerState => ({
  ...state,
  getManagerResponse: action.payload.response,
});
