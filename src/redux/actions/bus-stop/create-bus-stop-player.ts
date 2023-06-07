import { createActionCreator } from 'deox';

import {
  TCreateBusStopPlayerMaterials,
  TCreateBusStopPlayerResponse,
} from '@/services/api/bus-stop/create-bus-stop-player';

// CONSTANTS

export enum ECreateBusStopPlayerAction {
  CREATE_BUS_STOP_PLAYER = 'CREATE_BUS_STOP_PLAYER',
  CREATE_BUS_STOP_PLAYER_REQUEST = 'CREATE_BUS_STOP_PLAYER_REQUEST',
  CREATE_BUS_STOP_PLAYER_SUCCESS = 'CREATE_BUS_STOP_PLAYER_SUCCESS',
  CREATE_BUS_STOP_PLAYER_FAILED = 'CREATE_BUS_STOP_PLAYER_FAILED',
}

// TYPES

export type TCreateBusStopPlayerRequest = {
  type: ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER_REQUEST;
  payload: {
    materials: TCreateBusStopPlayerMaterials;
    successCallback?: (response: TCreateBusStopPlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateBusStopPlayerSuccess = {
  type: ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER_SUCCESS;
  payload: { response: TCreateBusStopPlayerResponse };
};

export type TCreateBusStopPlayerFailed = { type: ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER_FAILED };

// FUNCTION

export const createBusStopPlayerAction = {
  request: createActionCreator(
    ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TCreateBusStopPlayerMaterials,
        successCallback?: (response: TCreateBusStopPlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateBusStopPlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER_SUCCESS,
    (resolve) =>
      (response: TCreateBusStopPlayerResponse): TCreateBusStopPlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TCreateBusStopPlayerFailed =>
        resolve({ error }),
  ),
};
