import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getProductsAction } from '@/redux/actions';
import { getProducts, TGetProductsResponse } from '@/services/api';

// FUNCTION

export function* getProductsSaga(action: ActionType<typeof getProductsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getProducts, materials);
    const getProductsResponse: TGetProductsResponse = response as TGetProductsResponse;
    yield put(getProductsAction.success(getProductsResponse));
    successCallback?.(getProductsResponse);
  } catch (err) {
    yield put(getProductsAction.failure(err));
    failedCallback?.(err);
  }
}
