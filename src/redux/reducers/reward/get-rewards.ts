import { TRewardState } from '@/redux/reducers/reward';
import { TGetRewardsSuccess } from '@/redux/actions/reward';

export const getRewardsUpdateState = (state: TRewardState, action: TGetRewardsSuccess): TRewardState => ({
  ...state,
  getRewardsResponse: action.payload.response,
});
