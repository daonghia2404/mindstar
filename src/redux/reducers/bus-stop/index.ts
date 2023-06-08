import { createReducer } from 'deox';

import {
  TCreateBusStopPlayerResponse,
  TCreateBusStopResponse,
  TDeleteBusStopPlayerResponse,
  TDeleteBusStopResponse,
  TGetBusStopPlayersResponse,
  TGetBusStopsResponse,
  TGetPickupAttendancePlayersResponse,
  TGetPickupAttendancesResponse,
  TUpdateBusStopPlayerResponse,
  TUpdateBusStopResponse,
  TUpdatePickupAttendancesResponse,
} from '@/services/api/bus-stop';
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
import { createBusStopPlayerUpdateState } from './create-bus-stop-player';
import { createBusStopUpdateState } from './create-bus-stop';
import { deleteBusStopPlayerUpdateState } from './delete-bus-stop-player';
import { deleteBusStopUpdateState } from './delete-bus-stop';
import { getBusStopPlayersUpdateState } from './get-bus-stop-players';
import { getBusStopsUpdateState } from './get-bus-stops';
import { getPickupAttendancePlayersUpdateState } from './get-pickup-attendance-players';
import { getPickupAttendancesUpdateState } from './get-pickup-attendances';
import { updateBusStopPlayerUpdateState } from './update-bus-stop-player';
import { updateBusStopUpdateState } from './update-bus-stop';
import { updatePickupAttendancesUpdateState } from './update-pickup-attendances';

export type TBusStopState = {
  createBusStopPlayerResponse?: TCreateBusStopPlayerResponse;
  createBusStopResponse?: TCreateBusStopResponse;
  deleteBusStopPlayerResponse?: TDeleteBusStopPlayerResponse;
  deleteBusStopResponse?: TDeleteBusStopResponse;
  getBusStopPlayersResponse?: TGetBusStopPlayersResponse;
  getBusStopsResponse?: TGetBusStopsResponse;
  getPickupAttendancePlayersResponse?: TGetPickupAttendancePlayersResponse;
  getPickupAttendancesResponse?: TGetPickupAttendancesResponse;
  updateBusStopPlayerResponse?: TUpdateBusStopPlayerResponse;
  updateBusStopResponse?: TUpdateBusStopResponse;
  updatePickupAttendancesResponse?: TUpdatePickupAttendancesResponse;
};

const initialState: TBusStopState = {
  createBusStopPlayerResponse: undefined,
  createBusStopResponse: undefined,
  deleteBusStopPlayerResponse: undefined,
  deleteBusStopResponse: undefined,
  getBusStopPlayersResponse: undefined,
  getBusStopsResponse: undefined,
  getPickupAttendancePlayersResponse: undefined,
  getPickupAttendancesResponse: undefined,
  updateBusStopPlayerResponse: undefined,
  updateBusStopResponse: undefined,
  updatePickupAttendancesResponse: undefined,
};

const BusStopReducer = createReducer(initialState, (handleAction) => [
  handleAction(createBusStopPlayerAction.success, createBusStopPlayerUpdateState),
  handleAction(createBusStopAction.success, createBusStopUpdateState),
  handleAction(deleteBusStopPlayerAction.success, deleteBusStopPlayerUpdateState),
  handleAction(deleteBusStopAction.success, deleteBusStopUpdateState),
  handleAction(getBusStopPlayersAction.success, getBusStopPlayersUpdateState),
  handleAction(getBusStopsAction.success, getBusStopsUpdateState),
  handleAction(getPickupAttendancePlayersAction.success, getPickupAttendancePlayersUpdateState),
  handleAction(getPickupAttendancesAction.success, getPickupAttendancesUpdateState),
  handleAction(updateBusStopPlayerAction.success, updateBusStopPlayerUpdateState),
  handleAction(updateBusStopAction.success, updateBusStopUpdateState),
  handleAction(updatePickupAttendancesAction.success, updatePickupAttendancesUpdateState),
]);

export default BusStopReducer;
