import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { uploadAvatarUserAction } from '@/redux/actions';
import { uploadAvatarUser, TUploadAvatarUserResponse } from '@/services/api';

// FUNCTION

export function* uploadAvatarUserSaga(action: ActionType<typeof uploadAvatarUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(uploadAvatarUser, materials);
    const uploadAvatarUserResponse: TUploadAvatarUserResponse = response as TUploadAvatarUserResponse;
    yield put(uploadAvatarUserAction.success(uploadAvatarUserResponse));
    successCallback?.(uploadAvatarUserResponse);
  } catch (err) {
    yield put(uploadAvatarUserAction.failure(err));
    failedCallback?.(err);
  }
}
