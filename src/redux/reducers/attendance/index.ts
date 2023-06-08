import { createReducer } from 'deox';

import {
  TGetAttendancePlayersResponse,
  TGetAttendancesResponse,
  TGetManagerAttendancesResponse,
  TGetPlayerAttendancesResponse,
  TUpdateAttendancesResponse,
} from '@/services/api/attendance';
import {
  getAttendancePlayersAction,
  getAttendancesAction,
  getManagerAttendancesAction,
  getPlayerAttendancesAction,
  updateAttendancesAction,
} from '@/redux/actions';
import { getAttendancePlayersUpdateState } from './get-attendance-players';

import { getAttendancesUpdateState } from './get-attendances';
import { getManagerAttendancesUpdateState } from './get-manager-attendances';
import { getPlayerAttendancesUpdateState } from './get-player-attendances';
import { updateAttendancesUpdateState } from './update-attendances';

export type TAttendanceState = {
  getAttendancePlayersResponse?: TGetAttendancePlayersResponse;

  getAttendancesResponse?: TGetAttendancesResponse;
  getManagerAttendancesResponse?: TGetManagerAttendancesResponse;
  getPlayerAttendancesResponse?: TGetPlayerAttendancesResponse;
  updateAttendancesResponse?: TUpdateAttendancesResponse;
};

const initialState: TAttendanceState = {
  getAttendancePlayersResponse: undefined,

  getAttendancesResponse: undefined,
  getManagerAttendancesResponse: undefined,
  getPlayerAttendancesResponse: undefined,
  updateAttendancesResponse: undefined,
};

const AttendanceReducer = createReducer(initialState, (handleAction) => [
  handleAction(getAttendancePlayersAction.success, getAttendancePlayersUpdateState),

  handleAction(getAttendancesAction.success, getAttendancesUpdateState),
  handleAction(getManagerAttendancesAction.success, getManagerAttendancesUpdateState),
  handleAction(getPlayerAttendancesAction.success, getPlayerAttendancesUpdateState),
  handleAction(updateAttendancesAction.success, updateAttendancesUpdateState),
]);

export default AttendanceReducer;
