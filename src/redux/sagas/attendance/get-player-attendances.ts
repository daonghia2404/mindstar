import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPlayerAttendancesAction } from '@/redux/actions';
import { getPlayerAttendances, TGetPlayerAttendancesResponse } from '@/services/api';

// FUNCTION

export function* getPlayerAttendancesSaga(action: ActionType<typeof getPlayerAttendancesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPlayerAttendances, materials);
    const getPlayerAttendancesResponse: TGetPlayerAttendancesResponse = response as TGetPlayerAttendancesResponse;
    yield put(getPlayerAttendancesAction.success(getPlayerAttendancesResponse));
    successCallback?.(getPlayerAttendancesResponse);
  } catch (err) {
    yield put(getPlayerAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
