import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { resetPasswordAction } from '@/redux/actions';
import { resetPassword, TResetPasswordResponse } from '@/services/api';

// FUNCTION

export function* resetPasswordSaga(action: ActionType<typeof resetPasswordAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(resetPassword, materials);
    const resetPasswordResponse: TResetPasswordResponse = response as TResetPasswordResponse;
    yield put(resetPasswordAction.success(resetPasswordResponse));
    successCallback?.(resetPasswordResponse);
  } catch (err) {
    yield put(resetPasswordAction.failure(err));
    failedCallback?.(err);
  }
}
