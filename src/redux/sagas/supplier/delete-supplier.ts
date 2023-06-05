import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteSupplierAction } from '@/redux/actions';
import { deleteSupplier, TDeleteSupplierResponse } from '@/services/api';

// FUNCTION

export function* deleteSupplierSaga(action: ActionType<typeof deleteSupplierAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteSupplier, materials);
    const deleteSupplierResponse: TDeleteSupplierResponse = response as TDeleteSupplierResponse;
    yield put(deleteSupplierAction.success(deleteSupplierResponse));
    successCallback?.(deleteSupplierResponse);
  } catch (err) {
    yield put(deleteSupplierAction.failure(err));
    failedCallback?.(err);
  }
}
