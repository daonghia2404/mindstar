import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createUserAction } from '@/redux/actions';
import { createUser, TCreateUserResponse } from '@/services/api';

// FUNCTION

export function* createUserSaga(action: ActionType<typeof createUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createUser, materials);
    const createUserResponse: TCreateUserResponse = response as TCreateUserResponse;
    yield put(createUserAction.success(createUserResponse));
    successCallback?.(createUserResponse);
  } catch (err) {
    yield put(createUserAction.failure(err));
    failedCallback?.(err);
  }
}
