import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getManagersAction } from '@/redux/actions';
import { getManagers, TGetManagersResponse } from '@/services/api';

// FUNCTION

export function* getManagersSaga(action: ActionType<typeof getManagersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getManagers, materials);
    const getManagersResponse: TGetManagersResponse = response as TGetManagersResponse;
    yield put(getManagersAction.success(getManagersResponse));
    successCallback?.(getManagersResponse);
  } catch (err) {
    yield put(getManagersAction.failure(err));
    failedCallback?.(err);
  }
}
