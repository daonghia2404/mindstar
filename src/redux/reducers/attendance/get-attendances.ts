import { TAttendanceState } from '@/redux/reducers/attendance';
import { TGetAttendancesSuccess } from '@/redux/actions/attendance';

export const getAttendancesUpdateState = (
  state: TAttendanceState,
  action: TGetAttendancesSuccess,
): TAttendanceState => ({
  ...state,
  getAttendancesResponse: action.payload.response,
});
