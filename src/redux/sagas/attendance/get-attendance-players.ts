import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getAttendancePlayersAction } from '@/redux/actions';
import { getAttendancePlayers, TGetAttendancePlayersResponse } from '@/services/api';

// FUNCTION

export function* getAttendancePlayersSaga(action: ActionType<typeof getAttendancePlayersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getAttendancePlayers, materials);
    const getAttendancePlayersResponse: TGetAttendancePlayersResponse = response as TGetAttendancePlayersResponse;
    yield put(getAttendancePlayersAction.success(getAttendancePlayersResponse));
    successCallback?.(getAttendancePlayersResponse);
  } catch (err) {
    yield put(getAttendancePlayersAction.failure(err));
    failedCallback?.(err);
  }
}
