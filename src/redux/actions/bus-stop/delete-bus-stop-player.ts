import { createActionCreator } from 'deox';

import {
  TDeleteBusStopPlayerMaterials,
  TDeleteBusStopPlayerResponse,
} from '@/services/api/bus-stop/delete-bus-stop-player';

// CONSTANTS

export enum EDeleteBusStopPlayerAction {
  DELETE_BUS_STOP_PLAYER = 'DELETE_BUS_STOP_PLAYER',
  DELETE_BUS_STOP_PLAYER_REQUEST = 'DELETE_BUS_STOP_PLAYER_REQUEST',
  DELETE_BUS_STOP_PLAYER_SUCCESS = 'DELETE_BUS_STOP_PLAYER_SUCCESS',
  DELETE_BUS_STOP_PLAYER_FAILED = 'DELETE_BUS_STOP_PLAYER_FAILED',
}

// TYPES

export type TDeleteBusStopPlayerRequest = {
  type: EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER_REQUEST;
  payload: {
    materials: TDeleteBusStopPlayerMaterials;
    successCallback?: (response: TDeleteBusStopPlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteBusStopPlayerSuccess = {
  type: EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER_SUCCESS;
  payload: { response: TDeleteBusStopPlayerResponse };
};

export type TDeleteBusStopPlayerFailed = { type: EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER_FAILED };

// FUNCTION

export const deleteBusStopPlayerAction = {
  request: createActionCreator(
    EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TDeleteBusStopPlayerMaterials,
        successCallback?: (response: TDeleteBusStopPlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteBusStopPlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER_SUCCESS,
    (resolve) =>
      (response: TDeleteBusStopPlayerResponse): TDeleteBusStopPlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteBusStopPlayerAction.DELETE_BUS_STOP_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TDeleteBusStopPlayerFailed =>
        resolve({ error }),
  ),
};
