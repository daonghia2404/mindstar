import { TRedeemState } from '@/redux/reducers/redeem';
import { TUpdateRedeemSuccess } from '@/redux/actions/redeem';

export const updateRedeemUpdateState = (state: TRedeemState, action: TUpdateRedeemSuccess): TRedeemState => ({
  ...state,
  updateRedeemResponse: action.payload.response,
});
