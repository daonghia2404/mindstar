import { createReducer } from 'deox';

import { TGetSchedulesResponse } from '@/services/api/schedule';
import { getSchedulesAction } from '@/redux/actions';
import { getSchedulesUpdateState } from './get-schedules';

export type TScheduleState = {
  getSchedulesResponse?: TGetSchedulesResponse;
};

const initialState: TScheduleState = {
  getSchedulesResponse: undefined,
};

const ScheduleReducer = createReducer(initialState, (handleAction) => [
  handleAction(getSchedulesAction.success, getSchedulesUpdateState),
]);

export default ScheduleReducer;
