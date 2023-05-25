import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteClassAction } from '@/redux/actions';
import { deleteClass, TDeleteClassResponse } from '@/services/api';

// FUNCTION

export function* deleteClassSaga(action: ActionType<typeof deleteClassAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteClass, materials);
    const deleteClassResponse: TDeleteClassResponse = response as TDeleteClassResponse;
    yield put(deleteClassAction.success(deleteClassResponse));
    successCallback?.(deleteClassResponse);
  } catch (err) {
    yield put(deleteClassAction.failure(err));
    failedCallback?.(err);
  }
}
