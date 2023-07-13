import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getReportInventoriesAction } from '@/redux/actions';
import { getReportInventories, TGetReportInventoriesResponse } from '@/services/api';

// FUNCTION

export function* getReportInventoriesSaga(action: ActionType<typeof getReportInventoriesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getReportInventories, materials);
    const getReportInventoriesResponse: TGetReportInventoriesResponse = response as TGetReportInventoriesResponse;
    yield put(getReportInventoriesAction.success(getReportInventoriesResponse));
    successCallback?.(getReportInventoriesResponse);
  } catch (err) {
    yield put(getReportInventoriesAction.failure(err));
    failedCallback?.(err);
  }
}
