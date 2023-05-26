import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPlayersAction } from '@/redux/actions';
import { getPlayers, TGetPlayersResponse } from '@/services/api';

// FUNCTION

export function* getPlayersSaga(action: ActionType<typeof getPlayersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPlayers, materials);
    const getPlayersResponse: TGetPlayersResponse = response as TGetPlayersResponse;
    yield put(getPlayersAction.success(getPlayersResponse));
    successCallback?.(getPlayersResponse);
  } catch (err) {
    yield put(getPlayersAction.failure(err));
    failedCallback?.(err);
  }
}
