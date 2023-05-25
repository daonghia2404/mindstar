import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createClassAction } from '@/redux/actions';
import { createClass, TCreateClassResponse } from '@/services/api';

// FUNCTION

export function* createClassSaga(action: ActionType<typeof createClassAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createClass, materials);
    const createClassResponse: TCreateClassResponse = response as TCreateClassResponse;
    yield put(createClassAction.success(createClassResponse));
    successCallback?.(createClassResponse);
  } catch (err) {
    yield put(createClassAction.failure(err));
    failedCallback?.(err);
  }
}
