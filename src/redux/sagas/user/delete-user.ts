import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteUserAction } from '@/redux/actions';
import { deleteUser, TDeleteUserResponse } from '@/services/api';

// FUNCTION

export function* deleteUserSaga(action: ActionType<typeof deleteUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteUser, materials);
    const deleteUserResponse: TDeleteUserResponse = response as TDeleteUserResponse;
    yield put(deleteUserAction.success(deleteUserResponse));
    successCallback?.(deleteUserResponse);
  } catch (err) {
    yield put(deleteUserAction.failure(err));
    failedCallback?.(err);
  }
}
