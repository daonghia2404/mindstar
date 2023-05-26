import { createActionCreator } from 'deox';

import { TUpdatePlayerMaterials, TUpdatePlayerResponse } from '@/services/api/player/update-player';

// CONSTANTS

export enum EUpdatePlayerAction {
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  UPDATE_PLAYER_REQUEST = 'UPDATE_PLAYER_REQUEST',
  UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS',
  UPDATE_PLAYER_FAILED = 'UPDATE_PLAYER_FAILED',
}

// TYPES

export type TUpdatePlayerRequest = {
  type: EUpdatePlayerAction.UPDATE_PLAYER_REQUEST;
  payload: {
    materials: TUpdatePlayerMaterials;
    successCallback?: (response: TUpdatePlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdatePlayerSuccess = {
  type: EUpdatePlayerAction.UPDATE_PLAYER_SUCCESS;
  payload: { response: TUpdatePlayerResponse };
};

export type TUpdatePlayerFailed = { type: EUpdatePlayerAction.UPDATE_PLAYER_FAILED };

// FUNCTION

export const updatePlayerAction = {
  request: createActionCreator(
    EUpdatePlayerAction.UPDATE_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TUpdatePlayerMaterials,
        successCallback?: (response: TUpdatePlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdatePlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdatePlayerAction.UPDATE_PLAYER_SUCCESS,
    (resolve) =>
      (response: TUpdatePlayerResponse): TUpdatePlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdatePlayerAction.UPDATE_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TUpdatePlayerFailed =>
        resolve({ error }),
  ),
};
