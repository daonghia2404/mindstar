import { createActionCreator } from 'deox';

import { TUpdateBranchMaterials, TUpdateBranchResponse } from '@/services/api/branch/update-branch';

// CONSTANTS

export enum EUpdateBranchAction {
  UPDATE_BRANCH = 'UPDATE_BRANCH',
  UPDATE_BRANCH_REQUEST = 'UPDATE_BRANCH_REQUEST',
  UPDATE_BRANCH_SUCCESS = 'UPDATE_BRANCH_SUCCESS',
  UPDATE_BRANCH_FAILED = 'UPDATE_BRANCH_FAILED',
}

// TYPES

export type TUpdateBranchRequest = {
  type: EUpdateBranchAction.UPDATE_BRANCH_REQUEST;
  payload: {
    materials: TUpdateBranchMaterials;
    successCallback?: (response: TUpdateBranchResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateBranchSuccess = {
  type: EUpdateBranchAction.UPDATE_BRANCH_SUCCESS;
  payload: { response: TUpdateBranchResponse };
};

export type TUpdateBranchFailed = { type: EUpdateBranchAction.UPDATE_BRANCH_FAILED };

// FUNCTION

export const updateBranchAction = {
  request: createActionCreator(
    EUpdateBranchAction.UPDATE_BRANCH_REQUEST,
    (resolve) =>
      (
        materials: TUpdateBranchMaterials,
        successCallback?: (response: TUpdateBranchResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateBranchRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateBranchAction.UPDATE_BRANCH_SUCCESS,
    (resolve) =>
      (response: TUpdateBranchResponse): TUpdateBranchSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateBranchAction.UPDATE_BRANCH_FAILED,
    (resolve) =>
      (error: unknown): TUpdateBranchFailed =>
        resolve({ error }),
  ),
};
