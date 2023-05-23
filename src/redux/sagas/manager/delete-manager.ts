import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteManagerAction } from '@/redux/actions';
import { deleteManager, TDeleteManagerResponse } from '@/services/api';

// FUNCTION

export function* deleteManagerSaga(action: ActionType<typeof deleteManagerAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteManager, materials);
    const deleteManagerResponse: TDeleteManagerResponse = response as TDeleteManagerResponse;
    yield put(deleteManagerAction.success(deleteManagerResponse));
    successCallback?.(deleteManagerResponse);
  } catch (err) {
    yield put(deleteManagerAction.failure(err));
    failedCallback?.(err);
  }
}
