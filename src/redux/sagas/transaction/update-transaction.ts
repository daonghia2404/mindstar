import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateTransactionAction } from '@/redux/actions';
import { updateTransaction, TUpdateTransactionResponse } from '@/services/api';

// FUNCTION

export function* updateTransactionSaga(action: ActionType<typeof updateTransactionAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateTransaction, materials);
    const updateTransactionResponse: TUpdateTransactionResponse = response as TUpdateTransactionResponse;
    yield put(updateTransactionAction.success(updateTransactionResponse));
    successCallback?.(updateTransactionResponse);
  } catch (err) {
    yield put(updateTransactionAction.failure(err));
    failedCallback?.(err);
  }
}
