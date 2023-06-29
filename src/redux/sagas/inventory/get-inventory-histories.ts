import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getInventoryHistoriesAction } from '@/redux/actions';
import { getInventoryHistories, TGetInventoryHistoriesResponse } from '@/services/api';

// FUNCTION

export function* getInventoryHistoriesSaga(action: ActionType<typeof getInventoryHistoriesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getInventoryHistories, materials);
    const getInventoryHistoriesResponse: TGetInventoryHistoriesResponse = response as TGetInventoryHistoriesResponse;
    yield put(getInventoryHistoriesAction.success(getInventoryHistoriesResponse));
    successCallback?.(getInventoryHistoriesResponse);
  } catch (err) {
    yield put(getInventoryHistoriesAction.failure(err));
    failedCallback?.(err);
  }
}
