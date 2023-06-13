import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateMerchantFeedAction } from '@/redux/actions';
import { updateMerchantFeed, TUpdateMerchantFeedResponse } from '@/services/api';

// FUNCTION

export function* updateMerchantFeedSaga(action: ActionType<typeof updateMerchantFeedAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateMerchantFeed, materials);
    const updateMerchantFeedResponse: TUpdateMerchantFeedResponse = response as TUpdateMerchantFeedResponse;
    yield put(updateMerchantFeedAction.success(updateMerchantFeedResponse));
    successCallback?.(updateMerchantFeedResponse);
  } catch (err) {
    yield put(updateMerchantFeedAction.failure(err));
    failedCallback?.(err);
  }
}
