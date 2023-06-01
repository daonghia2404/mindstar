import { TRewardState } from '@/redux/reducers/reward';
import { TDeleteRewardSuccess } from '@/redux/actions/reward';

export const deleteRewardUpdateState = (state: TRewardState, action: TDeleteRewardSuccess): TRewardState => ({
  ...state,
  deleteRewardResponse: action.payload.response,
});
