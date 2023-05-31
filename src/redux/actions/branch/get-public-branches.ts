import { createActionCreator } from 'deox';

import { TGetPublicBranchesMaterials, TGetPublicBranchesResponse } from '@/services/api/branch/get-public-branches';

// CONSTANTS

export enum EGetPublicBranchesAction {
  GET_PUBLIC_BRANCHES = 'GET_PUBLIC_BRANCHES',
  GET_PUBLIC_BRANCHES_REQUEST = 'GET_PUBLIC_BRANCHES_REQUEST',
  GET_PUBLIC_BRANCHES_SUCCESS = 'GET_PUBLIC_BRANCHES_SUCCESS',
  GET_PUBLIC_BRANCHES_FAILED = 'GET_PUBLIC_BRANCHES_FAILED',
}

// TYPES

export type TGetPublicBranchesRequest = {
  type: EGetPublicBranchesAction.GET_PUBLIC_BRANCHES_REQUEST;
  payload: {
    materials: TGetPublicBranchesMaterials;
    successCallback?: (response: TGetPublicBranchesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPublicBranchesSuccess = {
  type: EGetPublicBranchesAction.GET_PUBLIC_BRANCHES_SUCCESS;
  payload: { response: TGetPublicBranchesResponse };
};

export type TGetPublicBranchesFailed = { type: EGetPublicBranchesAction.GET_PUBLIC_BRANCHES_FAILED };

// FUNCTION

export const getPublicBranchesAction = {
  request: createActionCreator(
    EGetPublicBranchesAction.GET_PUBLIC_BRANCHES_REQUEST,
    (resolve) =>
      (
        materials: TGetPublicBranchesMaterials,
        successCallback?: (response: TGetPublicBranchesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPublicBranchesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPublicBranchesAction.GET_PUBLIC_BRANCHES_SUCCESS,
    (resolve) =>
      (response: TGetPublicBranchesResponse): TGetPublicBranchesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPublicBranchesAction.GET_PUBLIC_BRANCHES_FAILED,
    (resolve) =>
      (error: unknown): TGetPublicBranchesFailed =>
        resolve({ error }),
  ),
};
