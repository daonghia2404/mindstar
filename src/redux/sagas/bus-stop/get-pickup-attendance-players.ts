import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPickupAttendancePlayersAction } from '@/redux/actions';
import { getPickupAttendancePlayers, TGetPickupAttendancePlayersResponse } from '@/services/api';

// FUNCTION

export function* getPickupAttendancePlayersSaga(
  action: ActionType<typeof getPickupAttendancePlayersAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPickupAttendancePlayers, materials);
    const getPickupAttendancePlayersResponse: TGetPickupAttendancePlayersResponse =
      response as TGetPickupAttendancePlayersResponse;
    yield put(getPickupAttendancePlayersAction.success(getPickupAttendancePlayersResponse));
    successCallback?.(getPickupAttendancePlayersResponse);
  } catch (err) {
    yield put(getPickupAttendancePlayersAction.failure(err));
    failedCallback?.(err);
  }
}
