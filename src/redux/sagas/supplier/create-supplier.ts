import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createSupplierAction } from '@/redux/actions';
import { createSupplier, TCreateSupplierResponse } from '@/services/api';

// FUNCTION

export function* createSupplierSaga(action: ActionType<typeof createSupplierAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createSupplier, materials);
    const createSupplierResponse: TCreateSupplierResponse = response as TCreateSupplierResponse;
    yield put(createSupplierAction.success(createSupplierResponse));
    successCallback?.(createSupplierResponse);
  } catch (err) {
    yield put(createSupplierAction.failure(err));
    failedCallback?.(err);
  }
}
