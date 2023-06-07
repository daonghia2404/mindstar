import { createReducer } from 'deox';

import {
  TGetAttendancePlayersResponse,
  TGetAttendancesResponse,
  TGetPlayerAttendancesResponse,
  TUpdateAttendancesResponse,
} from '@/services/api/attendance';
import {
  getAttendancePlayersAction,
  getAttendancesAction,
  getPlayerAttendancesAction,
  updateAttendancesAction,
} from '@/redux/actions';
import { getAttendancePlayersUpdateState } from './get-attendance-players';
import { getAttendancesUpdateState } from './get-attendances';
import { getPlayerAttendancesUpdateState } from './get-player-attendances';
import { updateAttendancesUpdateState } from './update-attendances';

export type TAttendanceState = {
  getAttendancePlayersResponse?: TGetAttendancePlayersResponse;
  getAttendancesResponse?: TGetAttendancesResponse;
  getPlayerAttendancesResponse?: TGetPlayerAttendancesResponse;
  updateAttendancesResponse?: TUpdateAttendancesResponse;
};

const initialState: TAttendanceState = {
  getAttendancePlayersResponse: undefined,
  getAttendancesResponse: undefined,
  getPlayerAttendancesResponse: undefined,
  updateAttendancesResponse: undefined,
};

const AttendanceReducer = createReducer(initialState, (handleAction) => [
  handleAction(getAttendancePlayersAction.success, getAttendancePlayersUpdateState),
  handleAction(getAttendancesAction.success, getAttendancesUpdateState),
  handleAction(getPlayerAttendancesAction.success, getPlayerAttendancesUpdateState),
  handleAction(updateAttendancesAction.success, updateAttendancesUpdateState),
]);

export default AttendanceReducer;
