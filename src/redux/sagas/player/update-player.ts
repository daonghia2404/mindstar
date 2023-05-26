import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updatePlayerAction } from '@/redux/actions';
import { updatePlayer, TUpdatePlayerResponse } from '@/services/api';

// FUNCTION

export function* updatePlayerSaga(action: ActionType<typeof updatePlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updatePlayer, materials);
    const updatePlayerResponse: TUpdatePlayerResponse = response as TUpdatePlayerResponse;
    yield put(updatePlayerAction.success(updatePlayerResponse));
    successCallback?.(updatePlayerResponse);
  } catch (err) {
    yield put(updatePlayerAction.failure(err));
    failedCallback?.(err);
  }
}
