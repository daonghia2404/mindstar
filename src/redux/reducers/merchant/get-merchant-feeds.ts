import { TMerchantState } from '@/redux/reducers/merchant';
import { TGetMerchantFeedsSuccess } from '@/redux/actions/merchant';

export const getMerchantFeedsUpdateState = (
  state: TMerchantState,
  action: TGetMerchantFeedsSuccess,
): TMerchantState => ({
  ...state,
  getMerchantFeedsResponse: action.payload.response,
});
