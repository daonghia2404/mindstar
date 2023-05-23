import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getSchedulesAction } from '@/redux/actions';
import { getSchedules, TGetSchedulesResponse } from '@/services/api';

// FUNCTION

export function* getSchedulesSaga(action: ActionType<typeof getSchedulesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getSchedules, materials);
    const getSchedulesResponse: TGetSchedulesResponse = response as TGetSchedulesResponse;
    yield put(getSchedulesAction.success(getSchedulesResponse));
    successCallback?.(getSchedulesResponse);
  } catch (err) {
    yield put(getSchedulesAction.failure(err));
    failedCallback?.(err);
  }
}
