import { all, takeLatest } from 'redux-saga/effects';

import { getAttendancePlayersAction, getAttendancesAction, updateAttendancesAction } from '@/redux/actions';

import { getAttendancePlayersSaga } from './get-attendance-players';
import { getAttendancesSaga } from './get-attendances';
import { updateAttendancesSaga } from './update-attendances';

export default function* root(): Generator {
  yield all([
    takeLatest(getAttendancePlayersAction.request.type, getAttendancePlayersSaga),
    takeLatest(getAttendancesAction.request.type, getAttendancesSaga),
    takeLatest(updateAttendancesAction.request.type, updateAttendancesSaga),
  ]);
}