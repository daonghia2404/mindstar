import { createActionCreator } from 'deox';

import { TCreateBranchMaterials, TCreateBranchResponse } from '@/services/api/branch/create-branch';

// CONSTANTS

export enum ECreateBranchAction {
  CREATE_BRANCH = 'CREATE_BRANCH',
  CREATE_BRANCH_REQUEST = 'CREATE_BRANCH_REQUEST',
  CREATE_BRANCH_SUCCESS = 'CREATE_BRANCH_SUCCESS',
  CREATE_BRANCH_FAILED = 'CREATE_BRANCH_FAILED',
}

// TYPES

export type TCreateBranchRequest = {
  type: ECreateBranchAction.CREATE_BRANCH_REQUEST;
  payload: {
    materials: TCreateBranchMaterials;
    successCallback?: (response: TCreateBranchResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateBranchSuccess = {
  type: ECreateBranchAction.CREATE_BRANCH_SUCCESS;
  payload: { response: TCreateBranchResponse };
};

export type TCreateBranchFailed = { type: ECreateBranchAction.CREATE_BRANCH_FAILED };

// FUNCTION

export const createBranchAction = {
  request: createActionCreator(
    ECreateBranchAction.CREATE_BRANCH_REQUEST,
    (resolve) =>
      (
        materials: TCreateBranchMaterials,
        successCallback?: (response: TCreateBranchResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateBranchRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateBranchAction.CREATE_BRANCH_SUCCESS,
    (resolve) =>
      (response: TCreateBranchResponse): TCreateBranchSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateBranchAction.CREATE_BRANCH_FAILED,
    (resolve) =>
      (error: unknown): TCreateBranchFailed =>
        resolve({ error }),
  ),
};
