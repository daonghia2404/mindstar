import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getUserAction } from '@/redux/actions';
import { getUser, TGetUserResponse } from '@/services/api';

// FUNCTION

export function* getUserSaga(action: ActionType<typeof getUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getUser, materials);
    const getUserResponse: TGetUserResponse = response as TGetUserResponse;
    yield put(getUserAction.success(getUserResponse));
    successCallback?.(getUserResponse);
  } catch (err) {
    yield put(getUserAction.failure(err));
    failedCallback?.(err);
  }
}
