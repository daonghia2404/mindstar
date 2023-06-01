import { TRewardState } from '@/redux/reducers/reward';
import { TCreateRewardSuccess } from '@/redux/actions/reward';

export const createRewardUpdateState = (state: TRewardState, action: TCreateRewardSuccess): TRewardState => ({
  ...state,
  createRewardResponse: action.payload.response,
});
