import { TAttendanceState } from '@/redux/reducers/attendance';
import { TGetAttendancePlayersSuccess } from '@/redux/actions/attendance';

export const getAttendancePlayersUpdateState = (
  state: TAttendanceState,
  action: TGetAttendancePlayersSuccess,
): TAttendanceState => ({
  ...state,
  getAttendancePlayersResponse: action.payload.response,
});
