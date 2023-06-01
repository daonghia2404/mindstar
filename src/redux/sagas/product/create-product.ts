import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createProductAction } from '@/redux/actions';
import { createProduct, TCreateProductResponse } from '@/services/api';

// FUNCTION

export function* createProductSaga(action: ActionType<typeof createProductAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createProduct, materials);
    const createProductResponse: TCreateProductResponse = response as TCreateProductResponse;
    yield put(createProductAction.success(createProductResponse));
    successCallback?.(createProductResponse);
  } catch (err) {
    yield put(createProductAction.failure(err));
    failedCallback?.(err);
  }
}
