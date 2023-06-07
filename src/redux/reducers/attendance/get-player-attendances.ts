import { TAttendanceState } from '@/redux/reducers/attendance';
import { TGetPlayerAttendancesSuccess } from '@/redux/actions/attendance';

export const getPlayerAttendancesUpdateState = (
  state: TAttendanceState,
  action: TGetPlayerAttendancesSuccess,
): TAttendanceState => ({
  ...state,
  getPlayerAttendancesResponse: action.payload.response,
});
