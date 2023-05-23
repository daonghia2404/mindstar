import { TDashboardState } from '@/redux/reducers/dashboard';
import { TGetDashboardSuccess } from '@/redux/actions/dashboard';

export const getDashboardUpdateState = (state: TDashboardState, action: TGetDashboardSuccess): TDashboardState => ({
  ...state,
  getDashboardResponse: action.payload.response,
});
