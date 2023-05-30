import { TAttendanceState } from '@/redux/reducers/attendance';
import { TUpdateAttendancesSuccess } from '@/redux/actions/attendance';

export const updateAttendancesUpdateState = (
  state: TAttendanceState,
  action: TUpdateAttendancesSuccess,
): TAttendanceState => ({
  ...state,
  updateAttendancesResponse: action.payload.response,
});
