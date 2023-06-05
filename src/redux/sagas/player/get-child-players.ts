import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getChildPlayersAction } from '@/redux/actions';
import { getChildPlayers, TGetChildPlayersResponse } from '@/services/api';

// FUNCTION

export function* getChildPlayersSaga(action: ActionType<typeof getChildPlayersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getChildPlayers, materials);
    const getChildPlayersResponse: TGetChildPlayersResponse = response as TGetChildPlayersResponse;
    yield put(getChildPlayersAction.success(getChildPlayersResponse));
    successCallback?.(getChildPlayersResponse);
  } catch (err) {
    yield put(getChildPlayersAction.failure(err));
    failedCallback?.(err);
  }
}
