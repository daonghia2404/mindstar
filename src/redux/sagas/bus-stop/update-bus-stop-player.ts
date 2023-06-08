import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateBusStopPlayerAction } from '@/redux/actions';
import { updateBusStopPlayer, TUpdateBusStopPlayerResponse } from '@/services/api';

// FUNCTION

export function* updateBusStopPlayerSaga(action: ActionType<typeof updateBusStopPlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateBusStopPlayer, materials);
    const updateBusStopPlayerResponse: TUpdateBusStopPlayerResponse = response as TUpdateBusStopPlayerResponse;
    yield put(updateBusStopPlayerAction.success(updateBusStopPlayerResponse));
    successCallback?.(updateBusStopPlayerResponse);
  } catch (err) {
    yield put(updateBusStopPlayerAction.failure(err));
    failedCallback?.(err);
  }
}
