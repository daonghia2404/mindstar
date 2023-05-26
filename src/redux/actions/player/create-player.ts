import { createActionCreator } from 'deox';

import { TCreatePlayerMaterials, TCreatePlayerResponse } from '@/services/api/player/create-player';

// CONSTANTS

export enum ECreatePlayerAction {
  CREATE_PLAYER = 'CREATE_PLAYER',
  CREATE_PLAYER_REQUEST = 'CREATE_PLAYER_REQUEST',
  CREATE_PLAYER_SUCCESS = 'CREATE_PLAYER_SUCCESS',
  CREATE_PLAYER_FAILED = 'CREATE_PLAYER_FAILED',
}

// TYPES

export type TCreatePlayerRequest = {
  type: ECreatePlayerAction.CREATE_PLAYER_REQUEST;
  payload: {
    materials: TCreatePlayerMaterials;
    successCallback?: (response: TCreatePlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreatePlayerSuccess = {
  type: ECreatePlayerAction.CREATE_PLAYER_SUCCESS;
  payload: { response: TCreatePlayerResponse };
};

export type TCreatePlayerFailed = { type: ECreatePlayerAction.CREATE_PLAYER_FAILED };

// FUNCTION

export const createPlayerAction = {
  request: createActionCreator(
    ECreatePlayerAction.CREATE_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TCreatePlayerMaterials,
        successCallback?: (response: TCreatePlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreatePlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreatePlayerAction.CREATE_PLAYER_SUCCESS,
    (resolve) =>
      (response: TCreatePlayerResponse): TCreatePlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreatePlayerAction.CREATE_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TCreatePlayerFailed =>
        resolve({ error }),
  ),
};
