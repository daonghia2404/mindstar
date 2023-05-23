import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getRedeemsAction } from '@/redux/actions';
import { getRedeems, TGetRedeemsResponse } from '@/services/api';

// FUNCTION

export function* getRedeemsSaga(action: ActionType<typeof getRedeemsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getRedeems, materials);
    const getRedeemsResponse: TGetRedeemsResponse = response as TGetRedeemsResponse;
    yield put(getRedeemsAction.success(getRedeemsResponse));
    successCallback?.(getRedeemsResponse);
  } catch (err) {
    yield put(getRedeemsAction.failure(err));
    failedCallback?.(err);
  }
}
