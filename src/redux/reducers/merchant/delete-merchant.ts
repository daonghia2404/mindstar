import { TMerchantState } from '@/redux/reducers/merchant';
import { TDeleteMerchantSuccess } from '@/redux/actions/merchant';

export const deleteMerchantUpdateState = (state: TMerchantState, action: TDeleteMerchantSuccess): TMerchantState => ({
  ...state,
  deleteMerchantResponse: action.payload.response,
});
