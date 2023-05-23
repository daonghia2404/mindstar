import { createActionCreator } from 'deox';

import { TGetManagersMaterials, TGetManagersResponse } from '@/services/api/manager/get-managers';

// CONSTANTS

export enum EGetManagersAction {
  GET_MANAGERS = 'GET_MANAGERS',
  GET_MANAGERS_REQUEST = 'GET_MANAGERS_REQUEST',
  GET_MANAGERS_SUCCESS = 'GET_MANAGERS_SUCCESS',
  GET_MANAGERS_FAILED = 'GET_MANAGERS_FAILED',
}

// TYPES

export type TGetManagersRequest = {
  type: EGetManagersAction.GET_MANAGERS_REQUEST;
  payload: {
    materials: TGetManagersMaterials;
    successCallback?: (response: TGetManagersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetManagersSuccess = {
  type: EGetManagersAction.GET_MANAGERS_SUCCESS;
  payload: { response: TGetManagersResponse };
};

export type TGetManagersFailed = { type: EGetManagersAction.GET_MANAGERS_FAILED };

// FUNCTION

export const getManagersAction = {
  request: createActionCreator(
    EGetManagersAction.GET_MANAGERS_REQUEST,
    (resolve) =>
      (
        materials: TGetManagersMaterials,
        successCallback?: (response: TGetManagersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetManagersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetManagersAction.GET_MANAGERS_SUCCESS,
    (resolve) =>
      (response: TGetManagersResponse): TGetManagersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetManagersAction.GET_MANAGERS_FAILED,
    (resolve) =>
      (error: unknown): TGetManagersFailed =>
        resolve({ error }),
  ),
};
