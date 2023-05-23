import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getTransactionsAction } from '@/redux/actions';
import { getTransactions, TGetTransactionsResponse } from '@/services/api';

// FUNCTION

export function* getTransactionsSaga(action: ActionType<typeof getTransactionsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getTransactions, materials);
    const getTransactionsResponse: TGetTransactionsResponse = response as TGetTransactionsResponse;
    yield put(getTransactionsAction.success(getTransactionsResponse));
    successCallback?.(getTransactionsResponse);
  } catch (err) {
    yield put(getTransactionsAction.failure(err));
    failedCallback?.(err);
  }
}
