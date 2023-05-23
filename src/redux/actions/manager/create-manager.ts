import { createActionCreator } from 'deox';

import { TCreateManagerMaterials, TCreateManagerResponse } from '@/services/api/manager/create-manager';

// CONSTANTS

export enum ECreateManagerAction {
  CREATE_MANAGER = 'CREATE_MANAGER',
  CREATE_MANAGER_REQUEST = 'CREATE_MANAGER_REQUEST',
  CREATE_MANAGER_SUCCESS = 'CREATE_MANAGER_SUCCESS',
  CREATE_MANAGER_FAILED = 'CREATE_MANAGER_FAILED',
}

// TYPES

export type TCreateManagerRequest = {
  type: ECreateManagerAction.CREATE_MANAGER_REQUEST;
  payload: {
    materials: TCreateManagerMaterials;
    successCallback?: (response: TCreateManagerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateManagerSuccess = {
  type: ECreateManagerAction.CREATE_MANAGER_SUCCESS;
  payload: { response: TCreateManagerResponse };
};

export type TCreateManagerFailed = { type: ECreateManagerAction.CREATE_MANAGER_FAILED };

// FUNCTION

export const createManagerAction = {
  request: createActionCreator(
    ECreateManagerAction.CREATE_MANAGER_REQUEST,
    (resolve) =>
      (
        materials: TCreateManagerMaterials,
        successCallback?: (response: TCreateManagerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateManagerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateManagerAction.CREATE_MANAGER_SUCCESS,
    (resolve) =>
      (response: TCreateManagerResponse): TCreateManagerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateManagerAction.CREATE_MANAGER_FAILED,
    (resolve) =>
      (error: unknown): TCreateManagerFailed =>
        resolve({ error }),
  ),
};
