import { createActionCreator } from 'deox';

import { TGetBranchesMaterials, TGetBranchesResponse } from '@/services/api/branch/get-branches';

// CONSTANTS

export enum EGetBranchesAction {
  GET_BRANCHES = 'GET_BRANCHES',
  GET_BRANCHES_REQUEST = 'GET_BRANCHES_REQUEST',
  GET_BRANCHES_SUCCESS = 'GET_BRANCHES_SUCCESS',
  GET_BRANCHES_FAILED = 'GET_BRANCHES_FAILED',
}

// TYPES

export type TGetBranchesRequest = {
  type: EGetBranchesAction.GET_BRANCHES_REQUEST;
  payload: {
    materials: TGetBranchesMaterials;
    successCallback?: (response: TGetBranchesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetBranchesSuccess = {
  type: EGetBranchesAction.GET_BRANCHES_SUCCESS;
  payload: { response: TGetBranchesResponse };
};

export type TGetBranchesFailed = { type: EGetBranchesAction.GET_BRANCHES_FAILED };

// FUNCTION

export const getBranchesAction = {
  request: createActionCreator(
    EGetBranchesAction.GET_BRANCHES_REQUEST,
    (resolve) =>
      (
        materials: TGetBranchesMaterials,
        successCallback?: (response: TGetBranchesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetBranchesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetBranchesAction.GET_BRANCHES_SUCCESS,
    (resolve) =>
      (response: TGetBranchesResponse): TGetBranchesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetBranchesAction.GET_BRANCHES_FAILED,
    (resolve) =>
      (error: unknown): TGetBranchesFailed =>
        resolve({ error }),
  ),
};
