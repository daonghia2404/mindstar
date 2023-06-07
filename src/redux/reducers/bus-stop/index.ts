import { createReducer } from 'deox';

import {
  TCreateBusStopPlayerResponse,
  TCreateBusStopResponse,
  TDeleteBusStopPlayerResponse,
  TDeleteBusStopResponse,
  TGetBusStopPlayersResponse,
  TGetBusStopsResponse,
  TUpdateBusStopPlayerResponse,
  TUpdateBusStopResponse,
} from '@/services/api/bus-stop';
import {
  createBusStopPlayerAction,
  createBusStopAction,
  deleteBusStopPlayerAction,
  deleteBusStopAction,
  getBusStopPlayersAction,
  getBusStopsAction,
  updateBusStopPlayerAction,
  updateBusStopAction,
} from '@/redux/actions';
import { createBusStopPlayerUpdateState } from './create-bus-stop-player';
import { createBusStopUpdateState } from './create-bus-stop';
import { deleteBusStopPlayerUpdateState } from './delete-bus-stop-player';
import { deleteBusStopUpdateState } from './delete-bus-stop';
import { getBusStopPlayersUpdateState } from './get-bus-stop-players';
import { getBusStopsUpdateState } from './get-bus-stops';
import { updateBusStopPlayerUpdateState } from './update-bus-stop-player';
import { updateBusStopUpdateState } from './update-bus-stop';

export type TBusStopState = {
  createBusStopPlayerResponse?: TCreateBusStopPlayerResponse;
  createBusStopResponse?: TCreateBusStopResponse;
  deleteBusStopPlayerResponse?: TDeleteBusStopPlayerResponse;
  deleteBusStopResponse?: TDeleteBusStopResponse;
  getBusStopPlayersResponse?: TGetBusStopPlayersResponse;
  getBusStopsResponse?: TGetBusStopsResponse;
  updateBusStopPlayerResponse?: TUpdateBusStopPlayerResponse;
  updateBusStopResponse?: TUpdateBusStopResponse;
};

const initialState: TBusStopState = {
  createBusStopPlayerResponse: undefined,
  createBusStopResponse: undefined,
  deleteBusStopPlayerResponse: undefined,
  deleteBusStopResponse: undefined,
  getBusStopPlayersResponse: undefined,
  getBusStopsResponse: undefined,
  updateBusStopPlayerResponse: undefined,
  updateBusStopResponse: undefined,
};

const BusStopReducer = createReducer(initialState, (handleAction) => [
  handleAction(createBusStopPlayerAction.success, createBusStopPlayerUpdateState),
  handleAction(createBusStopAction.success, createBusStopUpdateState),
  handleAction(deleteBusStopPlayerAction.success, deleteBusStopPlayerUpdateState),
  handleAction(deleteBusStopAction.success, deleteBusStopUpdateState),
  handleAction(getBusStopPlayersAction.success, getBusStopPlayersUpdateState),
  handleAction(getBusStopsAction.success, getBusStopsUpdateState),
  handleAction(updateBusStopPlayerAction.success, updateBusStopPlayerUpdateState),
  handleAction(updateBusStopAction.success, updateBusStopUpdateState),
]);

export default BusStopReducer;
