import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateManagerAction } from '@/redux/actions';
import { updateManager, TUpdateManagerResponse } from '@/services/api';

// FUNCTION

export function* updateManagerSaga(action: ActionType<typeof updateManagerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateManager, materials);
    const updateManagerResponse: TUpdateManagerResponse = response as TUpdateManagerResponse;
    yield put(updateManagerAction.success(updateManagerResponse));
    successCallback?.(updateManagerResponse);
  } catch (err) {
    yield put(updateManagerAction.failure(err));
    failedCallback?.(err);
  }
}
