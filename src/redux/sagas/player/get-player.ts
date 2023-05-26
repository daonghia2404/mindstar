import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPlayerAction } from '@/redux/actions';
import { getPlayer, TGetPlayerResponse } from '@/services/api';

// FUNCTION

export function* getPlayerSaga(action: ActionType<typeof getPlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPlayer, materials);
    const getPlayerResponse: TGetPlayerResponse = response as TGetPlayerResponse;
    yield put(getPlayerAction.success(getPlayerResponse));
    successCallback?.(getPlayerResponse);
  } catch (err) {
    yield put(getPlayerAction.failure(err));
    failedCallback?.(err);
  }
}
