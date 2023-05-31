import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPracticesAction } from '@/redux/actions';
import { getPractices, TGetPracticesResponse } from '@/services/api';

// FUNCTION

export function* getPracticesSaga(action: ActionType<typeof getPracticesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPractices, materials);
    const getPracticesResponse: TGetPracticesResponse = response as TGetPracticesResponse;
    yield put(getPracticesAction.success(getPracticesResponse));
    successCallback?.(getPracticesResponse);
  } catch (err) {
    yield put(getPracticesAction.failure(err));
    failedCallback?.(err);
  }
}
