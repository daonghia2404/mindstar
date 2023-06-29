import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteInventoryHistoryAction } from '@/redux/actions';
import { deleteInventoryHistory, TDeleteInventoryHistoryResponse } from '@/services/api';

// FUNCTION

export function* deleteInventoryHistorySaga(
  action: ActionType<typeof deleteInventoryHistoryAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteInventoryHistory, materials);
    const deleteInventoryHistoryResponse: TDeleteInventoryHistoryResponse = response as TDeleteInventoryHistoryResponse;
    yield put(deleteInventoryHistoryAction.success(deleteInventoryHistoryResponse));
    successCallback?.(deleteInventoryHistoryResponse);
  } catch (err) {
    yield put(deleteInventoryHistoryAction.failure(err));
    failedCallback?.(err);
  }
}
