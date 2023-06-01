import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateProductAction } from '@/redux/actions';
import { updateProduct, TUpdateProductResponse } from '@/services/api';

// FUNCTION

export function* updateProductSaga(action: ActionType<typeof updateProductAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateProduct, materials);
    const updateProductResponse: TUpdateProductResponse = response as TUpdateProductResponse;
    yield put(updateProductAction.success(updateProductResponse));
    successCallback?.(updateProductResponse);
  } catch (err) {
    yield put(updateProductAction.failure(err));
    failedCallback?.(err);
  }
}
