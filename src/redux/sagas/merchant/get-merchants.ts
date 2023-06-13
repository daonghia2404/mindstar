import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMerchantsAction } from '@/redux/actions';
import { getMerchants, TGetMerchantsResponse } from '@/services/api';

// FUNCTION

export function* getMerchantsSaga(action: ActionType<typeof getMerchantsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMerchants, materials);
    const getMerchantsResponse: TGetMerchantsResponse = response as TGetMerchantsResponse;
    yield put(getMerchantsAction.success(getMerchantsResponse));
    successCallback?.(getMerchantsResponse);
  } catch (err) {
    yield put(getMerchantsAction.failure(err));
    failedCallback?.(err);
  }
}
