import { createActionCreator } from 'deox';

import { TGetChildPlayersMaterials, TGetChildPlayersResponse } from '@/services/api/user/get-child-players';

// CONSTANTS

export enum EGetChildPlayersAction {
  GET_CHILD_PLAYERS = 'GET_CHILD_PLAYERS',
  GET_CHILD_PLAYERS_REQUEST = 'GET_CHILD_PLAYERS_REQUEST',
  GET_CHILD_PLAYERS_SUCCESS = 'GET_CHILD_PLAYERS_SUCCESS',
  GET_CHILD_PLAYERS_FAILED = 'GET_CHILD_PLAYERS_FAILED',
}

// TYPES

export type TGetChildPlayersRequest = {
  type: EGetChildPlayersAction.GET_CHILD_PLAYERS_REQUEST;
  payload: {
    materials: TGetChildPlayersMaterials;
    successCallback?: (response: TGetChildPlayersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetChildPlayersSuccess = {
  type: EGetChildPlayersAction.GET_CHILD_PLAYERS_SUCCESS;
  payload: { response: TGetChildPlayersResponse };
};

export type TGetChildPlayersFailed = { type: EGetChildPlayersAction.GET_CHILD_PLAYERS_FAILED };

// FUNCTION

export const getChildPlayersAction = {
  request: createActionCreator(
    EGetChildPlayersAction.GET_CHILD_PLAYERS_REQUEST,
    (resolve) =>
      (
        materials: TGetChildPlayersMaterials,
        successCallback?: (response: TGetChildPlayersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetChildPlayersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetChildPlayersAction.GET_CHILD_PLAYERS_SUCCESS,
    (resolve) =>
      (response: TGetChildPlayersResponse): TGetChildPlayersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetChildPlayersAction.GET_CHILD_PLAYERS_FAILED,
    (resolve) =>
      (error: unknown): TGetChildPlayersFailed =>
        resolve({ error }),
  ),
};
