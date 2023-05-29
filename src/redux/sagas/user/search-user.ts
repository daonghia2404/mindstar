import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { searchUserAction } from '@/redux/actions';
import { searchUser, TSearchUserResponse } from '@/services/api';

// FUNCTION

export function* searchUserSaga(action: ActionType<typeof searchUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(searchUser, materials);
    const searchUserResponse: TSearchUserResponse = response as TSearchUserResponse;
    yield put(searchUserAction.success(searchUserResponse));
    successCallback?.(searchUserResponse);
  } catch (err) {
    yield put(searchUserAction.failure(err));
    failedCallback?.(err);
  }
}
