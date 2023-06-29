import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createInventoryHistoryAction } from '@/redux/actions';
import { createInventoryHistory, TCreateInventoryHistoryResponse } from '@/services/api';

// FUNCTION

export function* createInventoryHistorySaga(
  action: ActionType<typeof createInventoryHistoryAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createInventoryHistory, materials);
    const createInventoryHistoryResponse: TCreateInventoryHistoryResponse = response as TCreateInventoryHistoryResponse;
    yield put(createInventoryHistoryAction.success(createInventoryHistoryResponse));
    successCallback?.(createInventoryHistoryResponse);
  } catch (err) {
    yield put(createInventoryHistoryAction.failure(err));
    failedCallback?.(err);
  }
}
