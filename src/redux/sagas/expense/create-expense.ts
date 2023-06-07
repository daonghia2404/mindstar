import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createExpenseAction } from '@/redux/actions';
import { createExpense, TCreateExpenseResponse } from '@/services/api';

// FUNCTION

export function* createExpenseSaga(action: ActionType<typeof createExpenseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createExpense, materials);
    const createExpenseResponse: TCreateExpenseResponse = response as TCreateExpenseResponse;
    yield put(createExpenseAction.success(createExpenseResponse));
    successCallback?.(createExpenseResponse);
  } catch (err) {
    yield put(createExpenseAction.failure(err));
    failedCallback?.(err);
  }
}
