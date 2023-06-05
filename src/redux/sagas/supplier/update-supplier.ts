import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateSupplierAction } from '@/redux/actions';
import { updateSupplier, TUpdateSupplierResponse } from '@/services/api';

// FUNCTION

export function* updateSupplierSaga(action: ActionType<typeof updateSupplierAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateSupplier, materials);
    const updateSupplierResponse: TUpdateSupplierResponse = response as TUpdateSupplierResponse;
    yield put(updateSupplierAction.success(updateSupplierResponse));
    successCallback?.(updateSupplierResponse);
  } catch (err) {
    yield put(updateSupplierAction.failure(err));
    failedCallback?.(err);
  }
}
