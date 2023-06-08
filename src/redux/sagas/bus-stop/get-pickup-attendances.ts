import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPickupAttendancesAction } from '@/redux/actions';
import { getPickupAttendances, TGetPickupAttendancesResponse } from '@/services/api';

// FUNCTION

export function* getPickupAttendancesSaga(action: ActionType<typeof getPickupAttendancesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPickupAttendances, materials);
    const getPickupAttendancesResponse: TGetPickupAttendancesResponse = response as TGetPickupAttendancesResponse;
    yield put(getPickupAttendancesAction.success(getPickupAttendancesResponse));
    successCallback?.(getPickupAttendancesResponse);
  } catch (err) {
    yield put(getPickupAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
