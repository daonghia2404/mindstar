import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getBusStopsAction } from '@/redux/actions';
import { getBusStops, TGetBusStopsResponse } from '@/services/api';

// FUNCTION

export function* getBusStopsSaga(action: ActionType<typeof getBusStopsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getBusStops, materials);
    const getBusStopsResponse: TGetBusStopsResponse = response as TGetBusStopsResponse;
    yield put(getBusStopsAction.success(getBusStopsResponse));
    successCallback?.(getBusStopsResponse);
  } catch (err) {
    yield put(getBusStopsAction.failure(err));
    failedCallback?.(err);
  }
}
