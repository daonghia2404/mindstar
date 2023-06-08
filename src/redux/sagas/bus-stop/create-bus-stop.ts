import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createBusStopAction } from '@/redux/actions';
import { createBusStop, TCreateBusStopResponse } from '@/services/api';

// FUNCTION

export function* createBusStopSaga(action: ActionType<typeof createBusStopAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createBusStop, materials);
    const createBusStopResponse: TCreateBusStopResponse = response as TCreateBusStopResponse;
    yield put(createBusStopAction.success(createBusStopResponse));
    successCallback?.(createBusStopResponse);
  } catch (err) {
    yield put(createBusStopAction.failure(err));
    failedCallback?.(err);
  }
}
