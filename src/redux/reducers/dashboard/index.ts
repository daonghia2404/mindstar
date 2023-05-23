import { createReducer } from 'deox';

import { TGetDashboardResponse } from '@/services/api/dashboard';
import { getDashboardAction } from '@/redux/actions';
import { getDashboardUpdateState } from './get-dashboard';

export type TDashboardState = {
  getDashboardResponse?: TGetDashboardResponse;
};

const initialState: TDashboardState = {
  getDashboardResponse: undefined,
};

const DashboardReducer = createReducer(initialState, (handleAction) => [
  handleAction(getDashboardAction.success, getDashboardUpdateState),
]);

export default DashboardReducer;
