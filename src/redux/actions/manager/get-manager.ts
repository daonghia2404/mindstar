import { createActionCreator } from 'deox';

import { TGetManagerMaterials, TGetManagerResponse } from '@/services/api/manager/get-manager';

// CONSTANTS

export enum EGetManagerAction {
  GET_MANAGER = 'GET_MANAGER',
  GET_MANAGER_REQUEST = 'GET_MANAGER_REQUEST',
  GET_MANAGER_SUCCESS = 'GET_MANAGER_SUCCESS',
  GET_MANAGER_FAILED = 'GET_MANAGER_FAILED',
}

// TYPES

export type TGetManagerRequest = {
  type: EGetManagerAction.GET_MANAGER_REQUEST;
  payload: {
    materials: TGetManagerMaterials;
    successCallback?: (response: TGetManagerResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetManagerSuccess = {
  type: EGetManagerAction.GET_MANAGER_SUCCESS;
  payload: { response: TGetManagerResponse };
};

export type TGetManagerFailed = { type: EGetManagerAction.GET_MANAGER_FAILED };

// FUNCTION

export const getManagerAction = {
  request: createActionCreator(
    EGetManagerAction.GET_MANAGER_REQUEST,
    (resolve) =>
      (
        materials: TGetManagerMaterials,
        successCallback?: (response: TGetManagerResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetManagerRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetManagerAction.GET_MANAGER_SUCCESS,
    (resolve) =>
      (response: TGetManagerResponse): TGetManagerSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetManagerAction.GET_MANAGER_FAILED,
    (resolve) =>
      (error: unknown): TGetManagerFailed =>
        resolve({ error }),
  ),
};
