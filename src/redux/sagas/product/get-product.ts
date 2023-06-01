import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getProductAction } from '@/redux/actions';
import { getProduct, TGetProductResponse } from '@/services/api';

// FUNCTION

export function* getProductSaga(action: ActionType<typeof getProductAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getProduct, materials);
    const getProductResponse: TGetProductResponse = response as TGetProductResponse;
    yield put(getProductAction.success(getProductResponse));
    successCallback?.(getProductResponse);
  } catch (err) {
    yield put(getProductAction.failure(err));
    failedCallback?.(err);
  }
}
