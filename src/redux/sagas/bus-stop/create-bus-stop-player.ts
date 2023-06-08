import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createBusStopPlayerAction } from '@/redux/actions';
import { createBusStopPlayer, TCreateBusStopPlayerResponse } from '@/services/api';

// FUNCTION

export function* createBusStopPlayerSaga(action: ActionType<typeof createBusStopPlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createBusStopPlayer, materials);
    const createBusStopPlayerResponse: TCreateBusStopPlayerResponse = response as TCreateBusStopPlayerResponse;
    yield put(createBusStopPlayerAction.success(createBusStopPlayerResponse));
    successCallback?.(createBusStopPlayerResponse);
  } catch (err) {
    yield put(createBusStopPlayerAction.failure(err));
    failedCallback?.(err);
  }
}
