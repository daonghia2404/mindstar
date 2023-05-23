import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMyProfileAction } from '@/redux/actions';
import { getMyProfile, TGetMyProfileResponse } from '@/services/api';

// FUNCTION

export function* getMyProfileSaga(action: ActionType<typeof getMyProfileAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMyProfile, materials);
    const getMyProfileResponse: TGetMyProfileResponse = response as TGetMyProfileResponse;
    yield put(getMyProfileAction.success(getMyProfileResponse));
    successCallback?.(getMyProfileResponse);
  } catch (err) {
    yield put(getMyProfileAction.failure(err));
    failedCallback?.(err);
  }
}
