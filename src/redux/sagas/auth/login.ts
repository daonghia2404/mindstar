import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { loginAction } from '@/redux/actions';
import { login, TLoginResponse } from '@/services/api';

import Helpers from '@/services/helpers';

// FUNCTION

export function* loginSaga(action: ActionType<typeof loginAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(login, materials);
    const loginResponse: TLoginResponse = response as TLoginResponse;

    Helpers.storeAccessToken(loginResponse?.access_token || '');
    Helpers.storeRefreshToken(loginResponse?.refresh_token || '');

    yield put(loginAction.success(loginResponse));
    successCallback?.(loginResponse);
  } catch (err) {
    yield put(loginAction.failure(err));
    failedCallback?.(err);
  }
}
