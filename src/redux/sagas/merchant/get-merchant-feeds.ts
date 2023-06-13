import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMerchantFeedsAction } from '@/redux/actions';
import { getMerchantFeeds, TGetMerchantFeedsResponse } from '@/services/api';

// FUNCTION

export function* getMerchantFeedsSaga(action: ActionType<typeof getMerchantFeedsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMerchantFeeds, materials);
    const getMerchantFeedsResponse: TGetMerchantFeedsResponse = response as TGetMerchantFeedsResponse;
    yield put(getMerchantFeedsAction.success(getMerchantFeedsResponse));
    successCallback?.(getMerchantFeedsResponse);
  } catch (err) {
    yield put(getMerchantFeedsAction.failure(err));
    failedCallback?.(err);
  }
}
