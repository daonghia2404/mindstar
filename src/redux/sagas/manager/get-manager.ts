import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getManagerAction } from '@/redux/actions';
import { getManager, TGetManagerResponse } from '@/services/api';

// FUNCTION

export function* getManagerSaga(action: ActionType<typeof getManagerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getManager, materials);
    const getManagerResponse: TGetManagerResponse = response as TGetManagerResponse;
    yield put(getManagerAction.success(getManagerResponse));
    successCallback?.(getManagerResponse);
  } catch (err) {
    yield put(getManagerAction.failure(err));
    failedCallback?.(err);
  }
}
