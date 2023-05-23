import { createActionCreator } from 'deox';

import { TDeleteManagerMaterials, TDeleteManagerResponse } from '@/services/api/manager/delete-manager';

// CONSTANTS

export enum EDeleteManagerAction {
  DELETE_MANAGER = 'DELETE_MANAGER',
  DELETE_MANAGER_REQUEST = 'DELETE_MANAGER_REQUEST',
  DELETE_MANAGER_SUCCESS = 'DELETE_MANAGER_SUCCESS',
  DELETE_MANAGER_FAILED = 'DELETE_MANAGER_FAILED',
}

// TYPES

export type TDeleteManagerRequest = {
  type: EDeleteManagerAction.DELETE_MANAGER_REQUEST;
  payload: {
    materials: TDeleteManagerMaterials;
    successCallback?: (response: TDeleteManagerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteManagerSuccess = {
  type: EDeleteManagerAction.DELETE_MANAGER_SUCCESS;
  payload: { response: TDeleteManagerResponse };
};

export type TDeleteManagerFailed = { type: EDeleteManagerAction.DELETE_MANAGER_FAILED };

// FUNCTION

export const deleteManagerAction = {
  request: createActionCreator(
    EDeleteManagerAction.DELETE_MANAGER_REQUEST,
    (resolve) =>
      (
        materials: TDeleteManagerMaterials,
        successCallback?: (response: TDeleteManagerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteManagerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteManagerAction.DELETE_MANAGER_SUCCESS,
    (resolve) =>
      (response: TDeleteManagerResponse): TDeleteManagerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteManagerAction.DELETE_MANAGER_FAILED,
    (resolve) =>
      (error: unknown): TDeleteManagerFailed =>
        resolve({ error }),
  ),
};
