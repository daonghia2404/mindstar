import { createActionCreator } from 'deox';

import { TChangePlayersBranchMaterials, TChangePlayersBranchResponse } from '@/services/api/user/change-players-branch';

// CONSTANTS

export enum EChangePlayersBranchAction {
  CHANGE_PLAYERS_BRANCH = 'CHANGE_PLAYERS_BRANCH',
  CHANGE_PLAYERS_BRANCH_REQUEST = 'CHANGE_PLAYERS_BRANCH_REQUEST',
  CHANGE_PLAYERS_BRANCH_SUCCESS = 'CHANGE_PLAYERS_BRANCH_SUCCESS',
  CHANGE_PLAYERS_BRANCH_FAILED = 'CHANGE_PLAYERS_BRANCH_FAILED',
}

// TYPES

export type TChangePlayersBranchRequest = {
  type: EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH_REQUEST;
  payload: {
    materials: TChangePlayersBranchMaterials;
    successCallback?: (response: TChangePlayersBranchResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TChangePlayersBranchSuccess = {
  type: EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH_SUCCESS;
  payload: { response: TChangePlayersBranchResponse };
};

export type TChangePlayersBranchFailed = { type: EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH_FAILED };

// FUNCTION

export const changePlayersBranchAction = {
  request: createActionCreator(
    EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH_REQUEST,
    (resolve) =>
      (
        materials: TChangePlayersBranchMaterials,
        successCallback?: (response: TChangePlayersBranchResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TChangePlayersBranchRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH_SUCCESS,
    (resolve) =>
      (response: TChangePlayersBranchResponse): TChangePlayersBranchSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EChangePlayersBranchAction.CHANGE_PLAYERS_BRANCH_FAILED,
    (resolve) =>
      (error: unknown): TChangePlayersBranchFailed =>
        resolve({ error }),
  ),
};
