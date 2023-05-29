import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateEventAction } from '@/redux/actions';
import { updateEvent, TUpdateEventResponse } from '@/services/api';

// FUNCTION

export function* updateEventSaga(action: ActionType<typeof updateEventAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateEvent, materials);
    const updateEventResponse: TUpdateEventResponse = response as TUpdateEventResponse;
    yield put(updateEventAction.success(updateEventResponse));
    successCallback?.(updateEventResponse);
  } catch (err) {
    yield put(updateEventAction.failure(err));
    failedCallback?.(err);
  }
}
