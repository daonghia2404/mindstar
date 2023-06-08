import { createActionCreator } from 'deox';

import {
  TUpdateBusStopPlayerMaterials,
  TUpdateBusStopPlayerResponse,
} from '@/services/api/bus-stop/update-bus-stop-player';

// CONSTANTS

export enum EUpdateBusStopPlayerAction {
  UPDATE_BUS_STOP_PLAYER = 'UPDATE_BUS_STOP_PLAYER',
  UPDATE_BUS_STOP_PLAYER_REQUEST = 'UPDATE_BUS_STOP_PLAYER_REQUEST',
  UPDATE_BUS_STOP_PLAYER_SUCCESS = 'UPDATE_BUS_STOP_PLAYER_SUCCESS',
  UPDATE_BUS_STOP_PLAYER_FAILED = 'UPDATE_BUS_STOP_PLAYER_FAILED',
}

// TYPES

export type TUpdateBusStopPlayerRequest = {
  type: EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER_REQUEST;
  payload: {
    materials: TUpdateBusStopPlayerMaterials;
    successCallback?: (response: TUpdateBusStopPlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateBusStopPlayerSuccess = {
  type: EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER_SUCCESS;
  payload: { response: TUpdateBusStopPlayerResponse };
};

export type TUpdateBusStopPlayerFailed = { type: EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER_FAILED };

// FUNCTION

export const updateBusStopPlayerAction = {
  request: createActionCreator(
    EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TUpdateBusStopPlayerMaterials,
        successCallback?: (response: TUpdateBusStopPlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateBusStopPlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER_SUCCESS,
    (resolve) =>
      (response: TUpdateBusStopPlayerResponse): TUpdateBusStopPlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TUpdateBusStopPlayerFailed =>
        resolve({ error }),
  ),
};
