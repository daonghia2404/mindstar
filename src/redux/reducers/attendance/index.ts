import { createReducer } from 'deox';

import {
  TGetAttendancePlayersResponse,
  TGetAttendancesResponse,
  TUpdateAttendancesResponse,
} from '@/services/api/attendance';
import { getAttendancePlayersAction, getAttendancesAction, updateAttendancesAction } from '@/redux/actions';
import { getAttendancePlayersUpdateState } from './get-attendance-players';
import { getAttendancesUpdateState } from './get-attendances';
import { updateAttendancesUpdateState } from './update-attendances';

export type TAttendanceState = {
  getAttendancePlayersResponse?: TGetAttendancePlayersResponse;
  getAttendancesResponse?: TGetAttendancesResponse;
  updateAttendancesResponse?: TUpdateAttendancesResponse;
};

const initialState: TAttendanceState = {
  getAttendancePlayersResponse: undefined,
  getAttendancesResponse: undefined,
  updateAttendancesResponse: undefined,
};

const AttendanceReducer = createReducer(initialState, (handleAction) => [
  handleAction(getAttendancePlayersAction.success, getAttendancePlayersUpdateState),
  handleAction(getAttendancesAction.success, getAttendancesUpdateState),
  handleAction(updateAttendancesAction.success, updateAttendancesUpdateState),
]);

export default AttendanceReducer;
