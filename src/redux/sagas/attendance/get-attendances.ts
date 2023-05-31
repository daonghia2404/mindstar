import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getAttendancesAction } from '@/redux/actions';
import { getAttendances, TGetAttendancesResponse } from '@/services/api';

// FUNCTION

export function* getAttendancesSaga(action: ActionType<typeof getAttendancesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getAttendances, materials);
    const getAttendancesResponse: TGetAttendancesResponse = response as TGetAttendancesResponse;
    yield put(getAttendancesAction.success(getAttendancesResponse));
    successCallback?.(getAttendancesResponse);
  } catch (err) {
    yield put(getAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
