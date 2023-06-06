import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createTransactionAction } from '@/redux/actions';
import { createTransaction, TCreateTransactionResponse } from '@/services/api';

// FUNCTION

export function* createTransactionSaga(action: ActionType<typeof createTransactionAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createTransaction, materials);
    const createTransactionResponse: TCreateTransactionResponse = response as TCreateTransactionResponse;
    yield put(createTransactionAction.success(createTransactionResponse));
    successCallback?.(createTransactionResponse);
  } catch (err) {
    yield put(createTransactionAction.failure(err));
    failedCallback?.(err);
  }
}
