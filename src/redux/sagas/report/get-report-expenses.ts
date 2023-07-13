import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getReportExpensesAction } from '@/redux/actions';
import { getReportExpenses, TGetReportExpensesResponse } from '@/services/api';

// FUNCTION

export function* getReportExpensesSaga(action: ActionType<typeof getReportExpensesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getReportExpenses, materials);
    const getReportExpensesResponse: TGetReportExpensesResponse = response as TGetReportExpensesResponse;
    yield put(getReportExpensesAction.success(getReportExpensesResponse));
    successCallback?.(getReportExpensesResponse);
  } catch (err) {
    yield put(getReportExpensesAction.failure(err));
    failedCallback?.(err);
  }
}
