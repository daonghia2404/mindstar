import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createManagerAction } from '@/redux/actions';
import { createManager, TCreateManagerResponse } from '@/services/api';

// FUNCTION

export function* createManagerSaga(action: ActionType<typeof createManagerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createManager, materials);
    const createManagerResponse: TCreateManagerResponse = response as TCreateManagerResponse;
    yield put(createManagerAction.success(createManagerResponse));
    successCallback?.(createManagerResponse);
  } catch (err) {
    yield put(createManagerAction.failure(err));
    failedCallback?.(err);
  }
}
