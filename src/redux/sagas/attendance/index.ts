import { all, takeLatest } from 'redux-saga/effects';

import {
  getAttendancePlayersAction,
  getAttendancesAction,
  getManagerAttendancesAction,
  getPlayerAttendancesAction,
  updateAttendancesAction,
} from '@/redux/actions';

import { getAttendancePlayersSaga } from './get-attendance-players';

import { getAttendancesSaga } from './get-attendances';
import { getManagerAttendancesSaga } from './get-manager-attendances';
import { getPlayerAttendancesSaga } from './get-player-attendances';
import { updateAttendancesSaga } from './update-attendances';

export default function* root(): Generator {
  yield all([
    takeLatest(getAttendancePlayersAction.request.type, getAttendancePlayersSaga),

    takeLatest(getAttendancesAction.request.type, getAttendancesSaga),
    takeLatest(getManagerAttendancesAction.request.type, getManagerAttendancesSaga),
    takeLatest(getPlayerAttendancesAction.request.type, getPlayerAttendancesSaga),
    takeLatest(updateAttendancesAction.request.type, updateAttendancesSaga),
  ]);
}
