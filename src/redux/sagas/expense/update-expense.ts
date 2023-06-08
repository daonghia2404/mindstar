import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateExpenseAction } from '@/redux/actions';
import { updateExpense, TUpdateExpenseResponse } from '@/services/api';

// FUNCTION

export function* updateExpenseSaga(action: ActionType<typeof updateExpenseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateExpense, materials);
    const updateExpenseResponse: TUpdateExpenseResponse = response as TUpdateExpenseResponse;
    yield put(updateExpenseAction.success(updateExpenseResponse));
    successCallback?.(updateExpenseResponse);
  } catch (err) {
    yield put(updateExpenseAction.failure(err));
    failedCallback?.(err);
  }
}
