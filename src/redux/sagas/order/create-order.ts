import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createOrderAction } from '@/redux/actions';
import { createOrder, TCreateOrderResponse } from '@/services/api';

// FUNCTION

export function* createOrderSaga(action: ActionType<typeof createOrderAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createOrder, materials);
    const createOrderResponse: TCreateOrderResponse = response as TCreateOrderResponse;
    yield put(createOrderAction.success(createOrderResponse));
    successCallback?.(createOrderResponse);
  } catch (err) {
    yield put(createOrderAction.failure(err));
    failedCallback?.(err);
  }
}
