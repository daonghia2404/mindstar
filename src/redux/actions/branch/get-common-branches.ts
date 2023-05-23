import { createActionCreator } from 'deox';

import { TGetCommonBranchesMaterials, TGetCommonBranchesResponse } from '@/services/api/branch/get-common-branches';

// CONSTANTS

export enum EGetCommonBranchesAction {
  GET_COMMON_BRANCHES = 'GET_COMMON_BRANCHES',
  GET_COMMON_BRANCHES_REQUEST = 'GET_COMMON_BRANCHES_REQUEST',
  GET_COMMON_BRANCHES_SUCCESS = 'GET_COMMON_BRANCHES_SUCCESS',
  GET_COMMON_BRANCHES_FAILED = 'GET_COMMON_BRANCHES_FAILED',
}

// TYPES

export type TGetCommonBranchesRequest = {
  type: EGetCommonBranchesAction.GET_COMMON_BRANCHES_REQUEST;
  payload: {
    materials: TGetCommonBranchesMaterials;
    successCallback?: (response: TGetCommonBranchesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetCommonBranchesSuccess = {
  type: EGetCommonBranchesAction.GET_COMMON_BRANCHES_SUCCESS;
  payload: { response: TGetCommonBranchesResponse };
};

export type TGetCommonBranchesFailed = { type: EGetCommonBranchesAction.GET_COMMON_BRANCHES_FAILED };

// FUNCTION

export const getCommonBranchesAction = {
  request: createActionCreator(
    EGetCommonBranchesAction.GET_COMMON_BRANCHES_REQUEST,
    (resolve) =>
      (
        materials: TGetCommonBranchesMaterials,
        successCallback?: (response: TGetCommonBranchesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetCommonBranchesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetCommonBranchesAction.GET_COMMON_BRANCHES_SUCCESS,
    (resolve) =>
      (response: TGetCommonBranchesResponse): TGetCommonBranchesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetCommonBranchesAction.GET_COMMON_BRANCHES_FAILED,
    (resolve) =>
      (error: unknown): TGetCommonBranchesFailed =>
        resolve({ error }),
  ),
};
