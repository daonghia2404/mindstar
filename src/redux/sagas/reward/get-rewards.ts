import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getRewardsAction } from '@/redux/actions';
import { getRewards, TGetRewardsResponse } from '@/services/api';

// FUNCTION

export function* getRewardsSaga(action: ActionType<typeof getRewardsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getRewards, materials);
    const getRewardsResponse: TGetRewardsResponse = response as TGetRewardsResponse;
    yield put(getRewardsAction.success(getRewardsResponse));
    successCallback?.(getRewardsResponse);
  } catch (err) {
    yield put(getRewardsAction.failure(err));
    failedCallback?.(err);
  }
}
