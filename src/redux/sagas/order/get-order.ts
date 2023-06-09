import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getOrderAction } from '@/redux/actions';
import { getOrder, TGetOrderResponse } from '@/services/api';

// FUNCTION

export function* getOrderSaga(action: ActionType<typeof getOrderAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getOrder, materials);
    const getOrderResponse: TGetOrderResponse = response as TGetOrderResponse;
    yield put(getOrderAction.success(getOrderResponse));
    successCallback?.(getOrderResponse);
  } catch (err) {
    yield put(getOrderAction.failure(err));
    failedCallback?.(err);
  }
}
