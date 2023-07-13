import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getInventorysAction } from '@/redux/actions';
import { getInventorys, TGetInventorysResponse } from '@/services/api';

// FUNCTION

export function* getInventorysSaga(action: ActionType<typeof getInventorysAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getInventorys, materials);
    const getInventorysResponse: TGetInventorysResponse = response as TGetInventorysResponse;
    yield put(getInventorysAction.success(getInventorysResponse));
    successCallback?.(getInventorysResponse);
  } catch (err) {
    yield put(getInventorysAction.failure(err));
    failedCallback?.(err);
  }
}
