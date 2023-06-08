import { TAttendanceState } from '@/redux/reducers/attendance';
import { TGetManagerAttendancesSuccess } from '@/redux/actions/attendance';

export const getManagerAttendancesUpdateState = (
  state: TAttendanceState,
  action: TGetManagerAttendancesSuccess,
): TAttendanceState => ({
  ...state,
  getManagerAttendancesResponse: action.payload.response,
});
