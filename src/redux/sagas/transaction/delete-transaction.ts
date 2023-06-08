import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteTransactionAction } from '@/redux/actions';
import { deleteTransaction, TDeleteTransactionResponse } from '@/services/api';

// FUNCTION

export function* deleteTransactionSaga(action: ActionType<typeof deleteTransactionAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteTransaction, materials);
    const deleteTransactionResponse: TDeleteTransactionResponse = response as TDeleteTransactionResponse;
    yield put(deleteTransactionAction.success(deleteTransactionResponse));
    successCallback?.(deleteTransactionResponse);
  } catch (err) {
    yield put(deleteTransactionAction.failure(err));
    failedCallback?.(err);
  }
}
