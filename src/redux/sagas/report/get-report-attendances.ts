import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getReportAttendancesAction } from '@/redux/actions';
import { getReportAttendances, TGetReportAttendancesResponse } from '@/services/api';

// FUNCTION

export function* getReportAttendancesSaga(action: ActionType<typeof getReportAttendancesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getReportAttendances, materials);
    const getReportAttendancesResponse: TGetReportAttendancesResponse = response as TGetReportAttendancesResponse;
    yield put(getReportAttendancesAction.success(getReportAttendancesResponse));
    successCallback?.(getReportAttendancesResponse);
  } catch (err) {
    yield put(getReportAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
