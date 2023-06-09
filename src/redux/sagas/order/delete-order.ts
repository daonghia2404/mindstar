import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteOrderAction } from '@/redux/actions';
import { deleteOrder, TDeleteOrderResponse } from '@/services/api';

// FUNCTION

export function* deleteOrderSaga(action: ActionType<typeof deleteOrderAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteOrder, materials);
    const deleteOrderResponse: TDeleteOrderResponse = response as TDeleteOrderResponse;
    yield put(deleteOrderAction.success(deleteOrderResponse));
    successCallback?.(deleteOrderResponse);
  } catch (err) {
    yield put(deleteOrderAction.failure(err));
    failedCallback?.(err);
  }
}
