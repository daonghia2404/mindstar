import { TRewardState } from '@/redux/reducers/reward';
import { TGetRewardSuccess } from '@/redux/actions/reward';

export const getRewardUpdateState = (state: TRewardState, action: TGetRewardSuccess): TRewardState => ({
  ...state,
  getRewardResponse: action.payload.response,
});
