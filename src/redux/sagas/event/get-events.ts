import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getEventsAction } from '@/redux/actions';
import { getEvents, TGetEventsResponse } from '@/services/api';

// FUNCTION

export function* getEventsSaga(action: ActionType<typeof getEventsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getEvents, materials);
    const getEventsResponse: TGetEventsResponse = response as TGetEventsResponse;
    yield put(getEventsAction.success(getEventsResponse));
    successCallback?.(getEventsResponse);
  } catch (err) {
    yield put(getEventsAction.failure(err));
    failedCallback?.(err);
  }
}
