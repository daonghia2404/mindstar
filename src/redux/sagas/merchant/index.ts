import { all, takeLatest } from 'redux-saga/effects';

import {
  deleteMerchantAction,
  getMerchantFeedsAction,
  getMerchantAction,
  getMerchantsAction,
  updateMerchantFeedAction,
} from '@/redux/actions';

import { deleteMerchantSaga } from './delete-merchant';
import { getMerchantFeedsSaga } from './get-merchant-feeds';
import { getMerchantSaga } from './get-merchant';
import { getMerchantsSaga } from './get-merchants';
import { updateMerchantFeedSaga } from './update-merchant-feed';

export default function* root(): Generator {
  yield all([
    takeLatest(deleteMerchantAction.request.type, deleteMerchantSaga),
    takeLatest(getMerchantFeedsAction.request.type, getMerchantFeedsSaga),
    takeLatest(getMerchantAction.request.type, getMerchantSaga),
    takeLatest(getMerchantsAction.request.type, getMerchantsSaga),
    takeLatest(updateMerchantFeedAction.request.type, updateMerchantFeedSaga),
  ]);
}
