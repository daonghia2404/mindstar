import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteRewardAction } from '@/redux/actions';
import { deleteReward, TDeleteRewardResponse } from '@/services/api';

// FUNCTION

export function* deleteRewardSaga(action: ActionType<typeof deleteRewardAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteReward, materials);
    const deleteRewardResponse: TDeleteRewardResponse = response as TDeleteRewardResponse;
    yield put(deleteRewardAction.success(deleteRewardResponse));
    successCallback?.(deleteRewardResponse);
  } catch (err) {
    yield put(deleteRewardAction.failure(err));
    failedCallback?.(err);
  }
}
