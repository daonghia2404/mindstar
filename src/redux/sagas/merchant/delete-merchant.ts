import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteMerchantAction } from '@/redux/actions';
import { deleteMerchant, TDeleteMerchantResponse } from '@/services/api';

// FUNCTION

export function* deleteMerchantSaga(action: ActionType<typeof deleteMerchantAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteMerchant, materials);
    const deleteMerchantResponse: TDeleteMerchantResponse = response as TDeleteMerchantResponse;
    yield put(deleteMerchantAction.success(deleteMerchantResponse));
    successCallback?.(deleteMerchantResponse);
  } catch (err) {
    yield put(deleteMerchantAction.failure(err));
    failedCallback?.(err);
  }
}
