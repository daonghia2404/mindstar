import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getRewardAction } from '@/redux/actions';
import { getReward, TGetRewardResponse } from '@/services/api';

// FUNCTION

export function* getRewardSaga(action: ActionType<typeof getRewardAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getReward, materials);
    const getRewardResponse: TGetRewardResponse = response as TGetRewardResponse;
    yield put(getRewardAction.success(getRewardResponse));
    successCallback?.(getRewardResponse);
  } catch (err) {
    yield put(getRewardAction.failure(err));
    failedCallback?.(err);
  }
}
