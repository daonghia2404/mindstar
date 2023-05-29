import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createPlayerAction } from '@/redux/actions';
import { createPlayer, TCreatePlayerResponse } from '@/services/api';

// FUNCTION

export function* createPlayerSaga(action: ActionType<typeof createPlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createPlayer, materials);
    const createPlayerResponse: TCreatePlayerResponse = response as TCreatePlayerResponse;
    yield put(createPlayerAction.success(createPlayerResponse));
    successCallback?.(createPlayerResponse);
  } catch (err) {
    yield put(createPlayerAction.failure(err));
    failedCallback?.(err);
  }
}
