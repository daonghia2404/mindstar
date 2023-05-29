import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createEventAction } from '@/redux/actions';
import { createEvent, TCreateEventResponse } from '@/services/api';

// FUNCTION

export function* createEventSaga(action: ActionType<typeof createEventAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createEvent, materials);
    const createEventResponse: TCreateEventResponse = response as TCreateEventResponse;
    yield put(createEventAction.success(createEventResponse));
    successCallback?.(createEventResponse);
  } catch (err) {
    yield put(createEventAction.failure(err));
    failedCallback?.(err);
  }
}
