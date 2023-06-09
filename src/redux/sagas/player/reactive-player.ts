import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { reactivePlayerAction } from '@/redux/actions';
import { reactivePlayer, TReactivePlayerResponse } from '@/services/api';

// FUNCTION

export function* reactivePlayerSaga(action: ActionType<typeof reactivePlayerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(reactivePlayer, materials);
    const reactivePlayerResponse: TReactivePlayerResponse = response as TReactivePlayerResponse;
    yield put(reactivePlayerAction.success(reactivePlayerResponse));
    successCallback?.(reactivePlayerResponse);
  } catch (err) {
    yield put(reactivePlayerAction.failure(err));
    failedCallback?.(err);
  }
}
