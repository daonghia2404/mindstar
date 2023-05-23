import { TScheduleState } from '@/redux/reducers/schedule';
import { TGetSchedulesSuccess } from '@/redux/actions/schedule';

export const getSchedulesUpdateState = (state: TScheduleState, action: TGetSchedulesSuccess): TScheduleState => ({
  ...state,
  getSchedulesResponse: action.payload.response,
});
