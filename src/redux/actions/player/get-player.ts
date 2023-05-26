import { createActionCreator } from 'deox';

import { TGetPlayerMaterials, TGetPlayerResponse } from '@/services/api/player/get-player';

// CONSTANTS

export enum EGetPlayerAction {
  GET_PLAYER = 'GET_PLAYER',
  GET_PLAYER_REQUEST = 'GET_PLAYER_REQUEST',
  GET_PLAYER_SUCCESS = 'GET_PLAYER_SUCCESS',
  GET_PLAYER_FAILED = 'GET_PLAYER_FAILED',
}

// TYPES

export type TGetPlayerRequest = {
  type: EGetPlayerAction.GET_PLAYER_REQUEST;
  payload: {
    materials: TGetPlayerMaterials;
    successCallback?: (response: TGetPlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPlayerSuccess = {
  type: EGetPlayerAction.GET_PLAYER_SUCCESS;
  payload: { response: TGetPlayerResponse };
};

export type TGetPlayerFailed = { type: EGetPlayerAction.GET_PLAYER_FAILED };

// FUNCTION

export const getPlayerAction = {
  request: createActionCreator(
    EGetPlayerAction.GET_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TGetPlayerMaterials,
        successCallback?: (response: TGetPlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPlayerAction.GET_PLAYER_SUCCESS,
    (resolve) =>
      (response: TGetPlayerResponse): TGetPlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPlayerAction.GET_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TGetPlayerFailed =>
        resolve({ error }),
  ),
};
