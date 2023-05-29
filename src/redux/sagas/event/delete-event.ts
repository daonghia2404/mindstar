import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteEventAction } from '@/redux/actions';
import { deleteEvent, TDeleteEventResponse } from '@/services/api';

// FUNCTION

export function* deleteEventSaga(action: ActionType<typeof deleteEventAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteEvent, materials);
    const deleteEventResponse: TDeleteEventResponse = response as TDeleteEventResponse;
    yield put(deleteEventAction.success(deleteEventResponse));
    successCallback?.(deleteEventResponse);
  } catch (err) {
    yield put(deleteEventAction.failure(err));
    failedCallback?.(err);
  }
}
