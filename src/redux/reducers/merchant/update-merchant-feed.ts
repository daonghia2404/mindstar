import { TMerchantState } from '@/redux/reducers/merchant';
import { TUpdateMerchantFeedSuccess } from '@/redux/actions/merchant';

export const updateMerchantFeedUpdateState = (
  state: TMerchantState,
  action: TUpdateMerchantFeedSuccess,
): TMerchantState => ({
  ...state,
  updateMerchantFeedResponse: action.payload.response,
});
