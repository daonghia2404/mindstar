import { createActionCreator } from 'deox';

import { TUpdateManagerMaterials, TUpdateManagerResponse } from '@/services/api/manager/update-manager';

// CONSTANTS

export enum EUpdateManagerAction {
  UPDATE_MANAGER = 'UPDATE_MANAGER',
  UPDATE_MANAGER_REQUEST = 'UPDATE_MANAGER_REQUEST',
  UPDATE_MANAGER_SUCCESS = 'UPDATE_MANAGER_SUCCESS',
  UPDATE_MANAGER_FAILED = 'UPDATE_MANAGER_FAILED',
}

// TYPES

export type TUpdateManagerRequest = {
  type: EUpdateManagerAction.UPDATE_MANAGER_REQUEST;
  payload: {
    materials: TUpdateManagerMaterials;
    successCallback?: (response: TUpdateManagerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateManagerSuccess = {
  type: EUpdateManagerAction.UPDATE_MANAGER_SUCCESS;
  payload: { response: TUpdateManagerResponse };
};

export type TUpdateManagerFailed = { type: EUpdateManagerAction.UPDATE_MANAGER_FAILED };

// FUNCTION

export const updateManagerAction = {
  request: createActionCreator(
    EUpdateManagerAction.UPDATE_MANAGER_REQUEST,
    (resolve) =>
      (
        materials: TUpdateManagerMaterials,
        successCallback?: (response: TUpdateManagerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateManagerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateManagerAction.UPDATE_MANAGER_SUCCESS,
    (resolve) =>
      (response: TUpdateManagerResponse): TUpdateManagerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateManagerAction.UPDATE_MANAGER_FAILED,
    (resolve) =>
      (error: unknown): TUpdateManagerFailed =>
        resolve({ error }),
  ),
};
