import { createReducer } from 'deox';

import {
  TCreateRewardResponse,
  TDeleteRewardResponse,
  TGetRewardResponse,
  TGetRewardsResponse,
  TUpdateRewardResponse,
} from '@/services/api/reward';
import {
  createRewardAction,
  deleteRewardAction,
  getRewardAction,
  getRewardsAction,
  updateRewardAction,
} from '@/redux/actions';
import { createRewardUpdateState } from './create-reward';
import { deleteRewardUpdateState } from './delete-reward';
import { getRewardUpdateState } from './get-reward';
import { getRewardsUpdateState } from './get-rewards';
import { updateRewardUpdateState } from './update-reward';

export type TRewardState = {
  createRewardResponse?: TCreateRewardResponse;
  deleteRewardResponse?: TDeleteRewardResponse;
  getRewardResponse?: TGetRewardResponse;
  getRewardsResponse?: TGetRewardsResponse;
  updateRewardResponse?: TUpdateRewardResponse;
};

const initialState: TRewardState = {
  createRewardResponse: undefined,
  deleteRewardResponse: undefined,
  getRewardResponse: undefined,
  getRewardsResponse: undefined,
  updateRewardResponse: undefined,
};

const RewardReducer = createReducer(initialState, (handleAction) => [
  handleAction(createRewardAction.success, createRewardUpdateState),
  handleAction(deleteRewardAction.success, deleteRewardUpdateState),
  handleAction(getRewardAction.success, getRewardUpdateState),
  handleAction(getRewardsAction.success, getRewardsUpdateState),
  handleAction(updateRewardAction.success, updateRewardUpdateState),
]);

export default RewardReducer;
