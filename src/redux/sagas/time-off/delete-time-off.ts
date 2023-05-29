import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteTimeOffAction } from '@/redux/actions';
import { deleteTimeOff, TDeleteTimeOffResponse } from '@/services/api';

// FUNCTION

export function* deleteTimeOffSaga(action: ActionType<typeof deleteTimeOffAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteTimeOff, materials);
    const deleteTimeOffResponse: TDeleteTimeOffResponse = response as TDeleteTimeOffResponse;
    yield put(deleteTimeOffAction.success(deleteTimeOffResponse));
    successCallback?.(deleteTimeOffResponse);
  } catch (err) {
    yield put(deleteTimeOffAction.failure(err));
    failedCallback?.(err);
  }
}
