import { all, takeLatest } from 'redux-saga/effects';

import {
  createBusStopPlayerAction,
  createBusStopAction,
  deleteBusStopPlayerAction,
  deleteBusStopAction,
  getBusStopPlayersAction,
  getBusStopsAction,
  getPickupAttendancePlayersAction,
  getPickupAttendancesAction,
  updateBusStopPlayerAction,
  updateBusStopAction,
  updatePickupAttendancesAction,
} from '@/redux/actions';

import { createBusStopPlayerSaga } from './create-bus-stop-player';
import { createBusStopSaga } from './create-bus-stop';
import { deleteBusStopPlayerSaga } from './delete-bus-stop-player';
import { deleteBusStopSaga } from './delete-bus-stop';
import { getBusStopPlayersSaga } from './get-bus-stop-players';
import { getBusStopsSaga } from './get-bus-stops';
import { getPickupAttendancePlayersSaga } from './get-pickup-attendance-players';
import { getPickupAttendancesSaga } from './get-pickup-attendances';
import { updateBusStopPlayerSaga } from './update-bus-stop-player';
import { updateBusStopSaga } from './update-bus-stop';
import { updatePickupAttendancesSaga } from './update-pickup-attendances';

export default function* root(): Generator {
  yield all([
    takeLatest(createBusStopPlayerAction.request.type, createBusStopPlayerSaga),
    takeLatest(createBusStopAction.request.type, createBusStopSaga),
    takeLatest(deleteBusStopPlayerAction.request.type, deleteBusStopPlayerSaga),
    takeLatest(deleteBusStopAction.request.type, deleteBusStopSaga),
    takeLatest(getBusStopPlayersAction.request.type, getBusStopPlayersSaga),
    takeLatest(getBusStopsAction.request.type, getBusStopsSaga),
    takeLatest(getPickupAttendancePlayersAction.request.type, getPickupAttendancePlayersSaga),
    takeLatest(getPickupAttendancesAction.request.type, getPickupAttendancesSaga),
    takeLatest(updateBusStopPlayerAction.request.type, updateBusStopPlayerSaga),
    takeLatest(updateBusStopAction.request.type, updateBusStopSaga),
    takeLatest(updatePickupAttendancesAction.request.type, updatePickupAttendancesSaga),
  ]);
}
