import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteProductAction } from '@/redux/actions';
import { deleteProduct, TDeleteProductResponse } from '@/services/api';

// FUNCTION

export function* deleteProductSaga(action: ActionType<typeof deleteProductAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteProduct, materials);
    const deleteProductResponse: TDeleteProductResponse = response as TDeleteProductResponse;
    yield put(deleteProductAction.success(deleteProductResponse));
    successCallback?.(deleteProductResponse);
  } catch (err) {
    yield put(deleteProductAction.failure(err));
    failedCallback?.(err);
  }
}
