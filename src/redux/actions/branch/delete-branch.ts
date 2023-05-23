import { createActionCreator } from 'deox';

import { TDeleteBranchMaterials, TDeleteBranchResponse } from '@/services/api/branch/delete-branch';

// CONSTANTS

export enum EDeleteBranchAction {
  DELETE_BRANCH = 'DELETE_BRANCH',
  DELETE_BRANCH_REQUEST = 'DELETE_BRANCH_REQUEST',
  DELETE_BRANCH_SUCCESS = 'DELETE_BRANCH_SUCCESS',
  DELETE_BRANCH_FAILED = 'DELETE_BRANCH_FAILED',
}

// TYPES

export type TDeleteBranchRequest = {
  type: EDeleteBranchAction.DELETE_BRANCH_REQUEST;
  payload: {
    materials: TDeleteBranchMaterials;
    successCallback?: (response: TDeleteBranchResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteBranchSuccess = {
  type: EDeleteBranchAction.DELETE_BRANCH_SUCCESS;
  payload: { response: TDeleteBranchResponse };
};

export type TDeleteBranchFailed = { type: EDeleteBranchAction.DELETE_BRANCH_FAILED };

// FUNCTION

export const deleteBranchAction = {
  request: createActionCreator(
    EDeleteBranchAction.DELETE_BRANCH_REQUEST,
    (resolve) =>
      (
        materials: TDeleteBranchMaterials,
        successCallback?: (response: TDeleteBranchResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteBranchRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteBranchAction.DELETE_BRANCH_SUCCESS,
    (resolve) =>
      (response: TDeleteBranchResponse): TDeleteBranchSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteBranchAction.DELETE_BRANCH_FAILED,
    (resolve) =>
      (error: unknown): TDeleteBranchFailed =>
        resolve({ error }),
  ),
};
