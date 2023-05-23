import { TManagerState } from '@/redux/reducers/manager';
import { TGetManagersSuccess } from '@/redux/actions/manager';

export const getManagersUpdateState = (state: TManagerState, action: TGetManagersSuccess): TManagerState => ({
  ...state,
  getManagersResponse: action.payload.response,
});
