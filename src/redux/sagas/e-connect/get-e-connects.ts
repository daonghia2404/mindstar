import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getEConnectsAction } from '@/redux/actions';
import { getEConnects, TGetEConnectsResponse } from '@/services/api';

// FUNCTION

export function* getEConnectsSaga(action: ActionType<typeof getEConnectsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getEConnects, materials);
    const getEConnectsResponse: TGetEConnectsResponse = response as TGetEConnectsResponse;
    yield put(getEConnectsAction.success(getEConnectsResponse));
    successCallback?.(getEConnectsResponse);
  } catch (err) {
    yield put(getEConnectsAction.failure(err));
    failedCallback?.(err);
  }
}
