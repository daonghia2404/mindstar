import { all, takeLatest } from 'redux-saga/effects';

import {
  createRewardAction,
  deleteRewardAction,
  getRewardAction,
  getRewardsAction,
  updateRewardAction,
} from '@/redux/actions';

import { createRewardSaga } from './create-reward';
import { deleteRewardSaga } from './delete-reward';
import { getRewardSaga } from './get-reward';
import { getRewardsSaga } from './get-rewards';
import { updateRewardSaga } from './update-reward';

export default function* root(): Generator {
  yield all([
    takeLatest(createRewardAction.request.type, createRewardSaga),
    takeLatest(deleteRewardAction.request.type, deleteRewardSaga),
    takeLatest(getRewardAction.request.type, getRewardSaga),
    takeLatest(getRewardsAction.request.type, getRewardsSaga),
    takeLatest(updateRewardAction.request.type, updateRewardSaga),
  ]);
}
