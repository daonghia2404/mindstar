import { TMerchantState } from '@/redux/reducers/merchant';
import { TGetMerchantsSuccess } from '@/redux/actions/merchant';

export const getMerchantsUpdateState = (state: TMerchantState, action: TGetMerchantsSuccess): TMerchantState => ({
  ...state,
  getMerchantsResponse: action.payload.response,
});
