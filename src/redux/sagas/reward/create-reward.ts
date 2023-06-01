import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createRewardAction } from '@/redux/actions';
import { createReward, TCreateRewardResponse } from '@/services/api';

// FUNCTION

export function* createRewardSaga(action: ActionType<typeof createRewardAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createReward, materials);
    const createRewardResponse: TCreateRewardResponse = response as TCreateRewardResponse;
    yield put(createRewardAction.success(createRewardResponse));
    successCallback?.(createRewardResponse);
  } catch (err) {
    yield put(createRewardAction.failure(err));
    failedCallback?.(err);
  }
}
