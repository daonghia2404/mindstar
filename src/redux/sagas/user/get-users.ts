import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getUsersAction } from '@/redux/actions';
import { getUsers, TGetUsersResponse } from '@/services/api';

// FUNCTION

export function* getUsersSaga(action: ActionType<typeof getUsersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getUsers, materials);
    const getUsersResponse: TGetUsersResponse = response as TGetUsersResponse;
    yield put(getUsersAction.success(getUsersResponse));
    successCallback?.(getUsersResponse);
  } catch (err) {
    yield put(getUsersAction.failure(err));
    failedCallback?.(err);
  }
}
