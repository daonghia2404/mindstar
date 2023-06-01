import { TRewardState } from '@/redux/reducers/reward';
import { TUpdateRewardSuccess } from '@/redux/actions/reward';

export const updateRewardUpdateState = (state: TRewardState, action: TUpdateRewardSuccess): TRewardState => ({
  ...state,
  updateRewardResponse: action.payload.response,
});
