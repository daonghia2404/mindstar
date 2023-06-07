import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getBusStopPlayersAction } from '@/redux/actions';
import { getBusStopPlayers, TGetBusStopPlayersResponse } from '@/services/api';

// FUNCTION

export function* getBusStopPlayersSaga(action: ActionType<typeof getBusStopPlayersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getBusStopPlayers, materials);
    const getBusStopPlayersResponse: TGetBusStopPlayersResponse = response as TGetBusStopPlayersResponse;
    yield put(getBusStopPlayersAction.success(getBusStopPlayersResponse));
    successCallback?.(getBusStopPlayersResponse);
  } catch (err) {
    yield put(getBusStopPlayersAction.failure(err));
    failedCallback?.(err);
  }
}
