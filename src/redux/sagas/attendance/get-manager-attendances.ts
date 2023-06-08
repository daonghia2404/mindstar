import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getManagerAttendancesAction } from '@/redux/actions';
import { getManagerAttendances, TGetManagerAttendancesResponse } from '@/services/api';

// FUNCTION

export function* getManagerAttendancesSaga(action: ActionType<typeof getManagerAttendancesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getManagerAttendances, materials);
    const getManagerAttendancesResponse: TGetManagerAttendancesResponse = response as TGetManagerAttendancesResponse;
    yield put(getManagerAttendancesAction.success(getManagerAttendancesResponse));
    successCallback?.(getManagerAttendancesResponse);
  } catch (err) {
    yield put(getManagerAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
