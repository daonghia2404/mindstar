import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateRewardAction } from '@/redux/actions';
import { updateReward, TUpdateRewardResponse } from '@/services/api';

// FUNCTION

export function* updateRewardSaga(action: ActionType<typeof updateRewardAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateReward, materials);
    const updateRewardResponse: TUpdateRewardResponse = response as TUpdateRewardResponse;
    yield put(updateRewardAction.success(updateRewardResponse));
    successCallback?.(updateRewardResponse);
  } catch (err) {
    yield put(updateRewardAction.failure(err));
    failedCallback?.(err);
  }
}
