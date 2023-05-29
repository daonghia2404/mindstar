import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getClassAction } from '@/redux/actions';
import { getClass, TGetClassResponse } from '@/services/api';

// FUNCTION

export function* getClassSaga(action: ActionType<typeof getClassAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getClass, materials);
    const getClassResponse: TGetClassResponse = response as TGetClassResponse;
    yield put(getClassAction.success(getClassResponse));
    successCallback?.(getClassResponse);
  } catch (err) {
    yield put(getClassAction.failure(err));
    failedCallback?.(err);
  }
}
