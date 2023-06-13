import { createReducer } from 'deox';

import {
  TDeleteMerchantResponse,
  TGetMerchantFeedsResponse,
  TGetMerchantResponse,
  TGetMerchantsResponse,
  TUpdateMerchantFeedResponse,
} from '@/services/api/merchant';
import {
  deleteMerchantAction,
  getMerchantFeedsAction,
  getMerchantAction,
  getMerchantsAction,
  updateMerchantFeedAction,
} from '@/redux/actions';
import { deleteMerchantUpdateState } from './delete-merchant';
import { getMerchantFeedsUpdateState } from './get-merchant-feeds';
import { getMerchantUpdateState } from './get-merchant';
import { getMerchantsUpdateState } from './get-merchants';
import { updateMerchantFeedUpdateState } from './update-merchant-feed';

export type TMerchantState = {
  deleteMerchantResponse?: TDeleteMerchantResponse;
  getMerchantFeedsResponse?: TGetMerchantFeedsResponse;
  getMerchantResponse?: TGetMerchantResponse;
  getMerchantsResponse?: TGetMerchantsResponse;
  updateMerchantFeedResponse?: TUpdateMerchantFeedResponse;
};

const initialState: TMerchantState = {
  deleteMerchantResponse: undefined,
  getMerchantFeedsResponse: undefined,
  getMerchantResponse: undefined,
  getMerchantsResponse: undefined,
  updateMerchantFeedResponse: undefined,
};

const MerchantReducer = createReducer(initialState, (handleAction) => [
  handleAction(deleteMerchantAction.success, deleteMerchantUpdateState),
  handleAction(getMerchantFeedsAction.success, getMerchantFeedsUpdateState),
  handleAction(getMerchantAction.success, getMerchantUpdateState),
  handleAction(getMerchantsAction.success, getMerchantsUpdateState),
  handleAction(updateMerchantFeedAction.success, updateMerchantFeedUpdateState),
]);

export default MerchantReducer;
