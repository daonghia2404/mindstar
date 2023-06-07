import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteExpenseAction } from '@/redux/actions';
import { deleteExpense, TDeleteExpenseResponse } from '@/services/api';

// FUNCTION

export function* deleteExpenseSaga(action: ActionType<typeof deleteExpenseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteExpense, materials);
    const deleteExpenseResponse: TDeleteExpenseResponse = response as TDeleteExpenseResponse;
    yield put(deleteExpenseAction.success(deleteExpenseResponse));
    successCallback?.(deleteExpenseResponse);
  } catch (err) {
    yield put(deleteExpenseAction.failure(err));
    failedCallback?.(err);
  }
}
