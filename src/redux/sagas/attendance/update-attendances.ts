import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateAttendancesAction } from '@/redux/actions';
import { updateAttendances, TUpdateAttendancesResponse } from '@/services/api';

// FUNCTION

export function* updateAttendancesSaga(action: ActionType<typeof updateAttendancesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateAttendances, materials);
    const updateAttendancesResponse: TUpdateAttendancesResponse = response as TUpdateAttendancesResponse;
    yield put(updateAttendancesAction.success(updateAttendancesResponse));
    successCallback?.(updateAttendancesResponse);
  } catch (err) {
    yield put(updateAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
