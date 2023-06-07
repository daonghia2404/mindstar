import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteBusStopAction } from '@/redux/actions';
import { deleteBusStop, TDeleteBusStopResponse } from '@/services/api';

// FUNCTION

export function* deleteBusStopSaga(action: ActionType<typeof deleteBusStopAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteBusStop, materials);
    const deleteBusStopResponse: TDeleteBusStopResponse = response as TDeleteBusStopResponse;
    yield put(deleteBusStopAction.success(deleteBusStopResponse));
    successCallback?.(deleteBusStopResponse);
  } catch (err) {
    yield put(deleteBusStopAction.failure(err));
    failedCallback?.(err);
  }
}
