import { createActionCreator } from 'deox';

import { TDeletePlayerMaterials, TDeletePlayerResponse } from '@/services/api/player/delete-player';

// CONSTANTS

export enum EDeletePlayerAction {
  DELETE_PLAYER = 'DELETE_PLAYER',
  DELETE_PLAYER_REQUEST = 'DELETE_PLAYER_REQUEST',
  DELETE_PLAYER_SUCCESS = 'DELETE_PLAYER_SUCCESS',
  DELETE_PLAYER_FAILED = 'DELETE_PLAYER_FAILED',
}

// TYPES

export type TDeletePlayerRequest = {
  type: EDeletePlayerAction.DELETE_PLAYER_REQUEST;
  payload: {
    materials: TDeletePlayerMaterials;
    successCallback?: (response: TDeletePlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeletePlayerSuccess = {
  type: EDeletePlayerAction.DELETE_PLAYER_SUCCESS;
  payload: { response: TDeletePlayerResponse };
};

export type TDeletePlayerFailed = { type: EDeletePlayerAction.DELETE_PLAYER_FAILED };

// FUNCTION

export const deletePlayerAction = {
  request: createActionCreator(
    EDeletePlayerAction.DELETE_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TDeletePlayerMaterials,
        successCallback?: (response: TDeletePlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeletePlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeletePlayerAction.DELETE_PLAYER_SUCCESS,
    (resolve) =>
      (response: TDeletePlayerResponse): TDeletePlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeletePlayerAction.DELETE_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TDeletePlayerFailed =>
        resolve({ error }),
  ),
};
