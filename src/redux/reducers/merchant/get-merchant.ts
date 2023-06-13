import { TMerchantState } from '@/redux/reducers/merchant';
import { TGetMerchantSuccess } from '@/redux/actions/merchant';

export const getMerchantUpdateState = (state: TMerchantState, action: TGetMerchantSuccess): TMerchantState => ({
  ...state,
  getMerchantResponse: action.payload.response,
});
