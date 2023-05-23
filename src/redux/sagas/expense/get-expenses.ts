import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getExpensesAction } from '@/redux/actions';
import { getExpenses, TGetExpensesResponse } from '@/services/api';

// FUNCTION

export function* getExpensesSaga(action: ActionType<typeof getExpensesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getExpenses, materials);
    const getExpensesResponse: TGetExpensesResponse = response as TGetExpensesResponse;
    yield put(getExpensesAction.success(getExpensesResponse));
    successCallback?.(getExpensesResponse);
  } catch (err) {
    yield put(getExpensesAction.failure(err));
    failedCallback?.(err);
  }
}
