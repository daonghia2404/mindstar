import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getSuppliersAction } from '@/redux/actions';
import { getSuppliers, TGetSuppliersResponse } from '@/services/api';

// FUNCTION

export function* getSuppliersSaga(action: ActionType<typeof getSuppliersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getSuppliers, materials);
    const getSuppliersResponse: TGetSuppliersResponse = response as TGetSuppliersResponse;
    yield put(getSuppliersAction.success(getSuppliersResponse));
    successCallback?.(getSuppliersResponse);
  } catch (err) {
    yield put(getSuppliersAction.failure(err));
    failedCallback?.(err);
  }
}
