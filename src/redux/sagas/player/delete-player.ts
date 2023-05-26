import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deletePlayerAction } from '@/redux/actions';
import { deletePlayer, TDeletePlayerResponse } from '@/services/api';

// FUNCTION

export function* deletePlayerSaga(action: ActionType<typeof deletePlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deletePlayer, materials);
    const deletePlayerResponse: TDeletePlayerResponse = response as TDeletePlayerResponse;
    yield put(deletePlayerAction.success(deletePlayerResponse));
    successCallback?.(deletePlayerResponse);
  } catch (err) {
    yield put(deletePlayerAction.failure(err));
    failedCallback?.(err);
  }
}
