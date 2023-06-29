import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createInventoryHistoryExpenseAction } from '@/redux/actions';
import { createInventoryHistoryExpense, TCreateInventoryHistoryExpenseResponse } from '@/services/api';

// FUNCTION

export function* createInventoryHistoryExpenseSaga(
  action: ActionType<typeof createInventoryHistoryExpenseAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createInventoryHistoryExpense, materials);
    const createInventoryHistoryExpenseResponse: TCreateInventoryHistoryExpenseResponse =
      response as TCreateInventoryHistoryExpenseResponse;
    yield put(createInventoryHistoryExpenseAction.success(createInventoryHistoryExpenseResponse));
    successCallback?.(createInventoryHistoryExpenseResponse);
  } catch (err) {
    yield put(createInventoryHistoryExpenseAction.failure(err));
    failedCallback?.(err);
  }
}
