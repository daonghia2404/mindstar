import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateClassAction } from '@/redux/actions';
import { updateClass, TUpdateClassResponse } from '@/services/api';

// FUNCTION

export function* updateClassSaga(action: ActionType<typeof updateClassAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateClass, materials);
    const updateClassResponse: TUpdateClassResponse = response as TUpdateClassResponse;
    yield put(updateClassAction.success(updateClassResponse));
    successCallback?.(updateClassResponse);
  } catch (err) {
    yield put(updateClassAction.failure(err));
    failedCallback?.(err);
  }
}
