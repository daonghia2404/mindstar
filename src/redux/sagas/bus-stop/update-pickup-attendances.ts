import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updatePickupAttendancesAction } from '@/redux/actions';
import { updatePickupAttendances, TUpdatePickupAttendancesResponse } from '@/services/api';

// FUNCTION

export function* updatePickupAttendancesSaga(
  action: ActionType<typeof updatePickupAttendancesAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updatePickupAttendances, materials);
    const updatePickupAttendancesResponse: TUpdatePickupAttendancesResponse =
      response as TUpdatePickupAttendancesResponse;
    yield put(updatePickupAttendancesAction.success(updatePickupAttendancesResponse));
    successCallback?.(updatePickupAttendancesResponse);
  } catch (err) {
    yield put(updatePickupAttendancesAction.failure(err));
    failedCallback?.(err);
  }
}
