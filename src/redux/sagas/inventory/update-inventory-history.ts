import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateInventoryHistoryAction } from '@/redux/actions';
import { updateInventoryHistory, TUpdateInventoryHistoryResponse } from '@/services/api';

// FUNCTION

export function* updateInventoryHistorySaga(
  action: ActionType<typeof updateInventoryHistoryAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateInventoryHistory, materials);
    const updateInventoryHistoryResponse: TUpdateInventoryHistoryResponse = response as TUpdateInventoryHistoryResponse;
    yield put(updateInventoryHistoryAction.success(updateInventoryHistoryResponse));
    successCallback?.(updateInventoryHistoryResponse);
  } catch (err) {
    yield put(updateInventoryHistoryAction.failure(err));
    failedCallback?.(err);
  }
}
