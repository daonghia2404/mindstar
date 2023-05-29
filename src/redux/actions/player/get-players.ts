import { createActionCreator } from 'deox';

import { TGetPlayersMaterials, TGetPlayersResponse } from '@/services/api/player/get-players';

// CONSTANTS

export enum EGetPlayersAction {
  GET_PLAYERS = 'GET_PLAYERS',
  GET_PLAYERS_REQUEST = 'GET_PLAYERS_REQUEST',
  GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS',
  GET_PLAYERS_FAILED = 'GET_PLAYERS_FAILED',
}

// TYPES

export type TGetPlayersRequest = {
  type: EGetPlayersAction.GET_PLAYERS_REQUEST;
  payload: {
    materials: TGetPlayersMaterials;
    successCallback?: (response: TGetPlayersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPlayersSuccess = {
  type: EGetPlayersAction.GET_PLAYERS_SUCCESS;
  payload: { response: TGetPlayersResponse };
};

export type TGetPlayersFailed = { type: EGetPlayersAction.GET_PLAYERS_FAILED };

// FUNCTION

export const getPlayersAction = {
  request: createActionCreator(
    EGetPlayersAction.GET_PLAYERS_REQUEST,
    (resolve) =>
      (
        materials: TGetPlayersMaterials,
        successCallback?: (response: TGetPlayersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPlayersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPlayersAction.GET_PLAYERS_SUCCESS,
    (resolve) =>
      (response: TGetPlayersResponse): TGetPlayersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPlayersAction.GET_PLAYERS_FAILED,
    (resolve) =>
      (error: unknown): TGetPlayersFailed =>
        resolve({ error }),
  ),
};
