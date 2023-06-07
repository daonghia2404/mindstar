import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateBusStopAction } from '@/redux/actions';
import { updateBusStop, TUpdateBusStopResponse } from '@/services/api';

// FUNCTION

export function* updateBusStopSaga(action: ActionType<typeof updateBusStopAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateBusStop, materials);
    const updateBusStopResponse: TUpdateBusStopResponse = response as TUpdateBusStopResponse;
    yield put(updateBusStopAction.success(updateBusStopResponse));
    successCallback?.(updateBusStopResponse);
  } catch (err) {
    yield put(updateBusStopAction.failure(err));
    failedCallback?.(err);
  }
}
