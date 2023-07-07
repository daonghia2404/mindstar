import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getReportRevenuesAction } from '@/redux/actions';
import { getReportRevenues, TGetReportRevenuesResponse } from '@/services/api';

// FUNCTION

export function* getReportRevenuesSaga(action: ActionType<typeof getReportRevenuesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getReportRevenues, materials);
    const getReportRevenuesResponse: TGetReportRevenuesResponse = response as TGetReportRevenuesResponse;
    yield put(getReportRevenuesAction.success(getReportRevenuesResponse));
    successCallback?.(getReportRevenuesResponse);
  } catch (err) {
    yield put(getReportRevenuesAction.failure(err));
    failedCallback?.(err);
  }
}
