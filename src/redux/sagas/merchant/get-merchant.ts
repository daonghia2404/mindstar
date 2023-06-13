import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMerchantAction } from '@/redux/actions';
import { getMerchant, TGetMerchantResponse } from '@/services/api';

// FUNCTION

export function* getMerchantSaga(action: ActionType<typeof getMerchantAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMerchant, materials);
    const getMerchantResponse: TGetMerchantResponse = response as TGetMerchantResponse;
    yield put(getMerchantAction.success(getMerchantResponse));
    successCallback?.(getMerchantResponse);
  } catch (err) {
    yield put(getMerchantAction.failure(err));
    failedCallback?.(err);
  }
}
