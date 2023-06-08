import { createActionCreator } from 'deox';

import { TGetBusStopPlayersMaterials, TGetBusStopPlayersResponse } from '@/services/api/bus-stop/get-bus-stop-players';

// CONSTANTS

export enum EGetBusStopPlayersAction {
  GET_BUS_STOP_PLAYERS = 'GET_BUS_STOP_PLAYERS',
  GET_BUS_STOP_PLAYERS_REQUEST = 'GET_BUS_STOP_PLAYERS_REQUEST',
  GET_BUS_STOP_PLAYERS_SUCCESS = 'GET_BUS_STOP_PLAYERS_SUCCESS',
  GET_BUS_STOP_PLAYERS_FAILED = 'GET_BUS_STOP_PLAYERS_FAILED',
}

// TYPES

export type TGetBusStopPlayersRequest = {
  type: EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS_REQUEST;
  payload: {
    materials: TGetBusStopPlayersMaterials;
    successCallback?: (response: TGetBusStopPlayersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetBusStopPlayersSuccess = {
  type: EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS_SUCCESS;
  payload: { response?: TGetBusStopPlayersResponse };
};

export type TGetBusStopPlayersFailed = { type: EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS_FAILED };

// FUNCTION

export const getBusStopPlayersAction = {
  request: createActionCreator(
    EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS_REQUEST,
    (resolve) =>
      (
        materials: TGetBusStopPlayersMaterials,
        successCallback?: (response: TGetBusStopPlayersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetBusStopPlayersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS_SUCCESS,
    (resolve) =>
      (response?: TGetBusStopPlayersResponse): TGetBusStopPlayersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS_FAILED,
    (resolve) =>
      (error: unknown): TGetBusStopPlayersFailed =>
        resolve({ error }),
  ),
};
