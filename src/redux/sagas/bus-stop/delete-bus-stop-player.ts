import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteBusStopPlayerAction } from '@/redux/actions';
import { deleteBusStopPlayer, TDeleteBusStopPlayerResponse } from '@/services/api';

// FUNCTION

export function* deleteBusStopPlayerSaga(action: ActionType<typeof deleteBusStopPlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteBusStopPlayer, materials);
    const deleteBusStopPlayerResponse: TDeleteBusStopPlayerResponse = response as TDeleteBusStopPlayerResponse;
    yield put(deleteBusStopPlayerAction.success(deleteBusStopPlayerResponse));
    successCallback?.(deleteBusStopPlayerResponse);
  } catch (err) {
    yield put(deleteBusStopPlayerAction.failure(err));
    failedCallback?.(err);
  }
}
