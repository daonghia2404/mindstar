import { TRedeemState } from '@/redux/reducers/redeem';
import { TGetRedeemsSuccess } from '@/redux/actions/redeem';

export const getRedeemsUpdateState = (state: TRedeemState, action: TGetRedeemsSuccess): TRedeemState => ({
  ...state,
  getRedeemsResponse: action.payload.response,
});
