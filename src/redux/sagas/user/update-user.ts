import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateUserAction } from '@/redux/actions';
import { updateUser, TUpdateUserResponse } from '@/services/api';

// FUNCTION

export function* updateUserSaga(action: ActionType<typeof updateUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateUser, materials);
    const updateUserResponse: TUpdateUserResponse = response as TUpdateUserResponse;
    yield put(updateUserAction.success(updateUserResponse));
    successCallback?.(updateUserResponse);
  } catch (err) {
    yield put(updateUserAction.failure(err));
    failedCallback?.(err);
  }
}
