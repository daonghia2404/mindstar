import { createActionCreator } from 'deox';

import { TReactivePlayerMaterials, TReactivePlayerResponse } from '@/services/api/player/reactive-player';

// CONSTANTS

export enum EReactivePlayerAction {
  REACTIVE_PLAYER = 'REACTIVE_PLAYER',
  REACTIVE_PLAYER_REQUEST = 'REACTIVE_PLAYER_REQUEST',
  REACTIVE_PLAYER_SUCCESS = 'REACTIVE_PLAYER_SUCCESS',
  REACTIVE_PLAYER_FAILED = 'REACTIVE_PLAYER_FAILED',
}

// TYPES

export type TReactivePlayerRequest = {
  type: EReactivePlayerAction.REACTIVE_PLAYER_REQUEST;
  payload: {
    materials: TReactivePlayerMaterials;
    successCallback?: (response: TReactivePlayerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TReactivePlayerSuccess = {
  type: EReactivePlayerAction.REACTIVE_PLAYER_SUCCESS;
  payload: { response: TReactivePlayerResponse };
};

export type TReactivePlayerFailed = { type: EReactivePlayerAction.REACTIVE_PLAYER_FAILED };

// FUNCTION

export const reactivePlayerAction = {
  request: createActionCreator(
    EReactivePlayerAction.REACTIVE_PLAYER_REQUEST,
    (resolve) =>
      (
        materials: TReactivePlayerMaterials,
        successCallback?: (response: TReactivePlayerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TReactivePlayerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EReactivePlayerAction.REACTIVE_PLAYER_SUCCESS,
    (resolve) =>
      (response: TReactivePlayerResponse): TReactivePlayerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EReactivePlayerAction.REACTIVE_PLAYER_FAILED,
    (resolve) =>
      (error: unknown): TReactivePlayerFailed =>
        resolve({ error }),
  ),
};
