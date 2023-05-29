import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getTimeOffsAction } from '@/redux/actions';
import { getTimeOffs, TGetTimeOffsResponse } from '@/services/api';

// FUNCTION

export function* getTimeOffsSaga(action: ActionType<typeof getTimeOffsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getTimeOffs, materials);
    const getTimeOffsResponse: TGetTimeOffsResponse = response as TGetTimeOffsResponse;
    yield put(getTimeOffsAction.success(getTimeOffsResponse));
    successCallback?.(getTimeOffsResponse);
  } catch (err) {
    yield put(getTimeOffsAction.failure(err));
    failedCallback?.(err);
  }
}
