import { TRedeemState } from '@/redux/reducers/redeem';
import { TDeleteRedeemSuccess } from '@/redux/actions/redeem';

export const deleteRedeemUpdateState = (state: TRedeemState, action: TDeleteRedeemSuccess): TRedeemState => ({
  ...state,
  deleteRedeemResponse: action.payload.response,
});
