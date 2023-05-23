import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getDashboardAction } from '@/redux/actions';
import { getDashboard, TGetDashboardResponse } from '@/services/api';

// FUNCTION

export function* getDashboardSaga(action: ActionType<typeof getDashboardAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getDashboard, materials);
    const getDashboardResponse: TGetDashboardResponse = response as TGetDashboardResponse;
    yield put(getDashboardAction.success(getDashboardResponse));
    successCallback?.(getDashboardResponse);
  } catch (err) {
    yield put(getDashboardAction.failure(err));
    failedCallback?.(err);
  }
}
