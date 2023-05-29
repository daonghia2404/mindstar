import { createActionCreator } from 'deox';

import { TGetClassMaterials, TGetClassResponse } from '@/services/api/class/get-class';

// CONSTANTS

export enum EGetClassAction {
  GET_CLASS = 'GET_CLASS',
  GET_CLASS_REQUEST = 'GET_CLASS_REQUEST',
  GET_CLASS_SUCCESS = 'GET_CLASS_SUCCESS',
  GET_CLASS_FAILED = 'GET_CLASS_FAILED',
}

// TYPES

export type TGetClassRequest = {
  type: EGetClassAction.GET_CLASS_REQUEST;
  payload: {
    materials: TGetClassMaterials;
    successCallback?: (response: TGetClassResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetClassSuccess = {
  type: EGetClassAction.GET_CLASS_SUCCESS;
  payload: { response: TGetClassResponse };
};

export type TGetClassFailed = { type: EGetClassAction.GET_CLASS_FAILED };

// FUNCTION

export const getClassAction = {
  request: createActionCreator(
    EGetClassAction.GET_CLASS_REQUEST,
    (resolve) =>
      (
        materials: TGetClassMaterials,
        successCallback?: (response: TGetClassResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetClassRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetClassAction.GET_CLASS_SUCCESS,
    (resolve) =>
      (response: TGetClassResponse): TGetClassSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetClassAction.GET_CLASS_FAILED,
    (resolve) =>
      (error: unknown): TGetClassFailed =>
        resolve({ error }),
  ),
};
