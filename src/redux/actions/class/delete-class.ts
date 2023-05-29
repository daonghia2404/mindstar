import { createActionCreator } from 'deox';

import { TDeleteClassMaterials, TDeleteClassResponse } from '@/services/api/class/delete-class';

// CONSTANTS

export enum EDeleteClassAction {
  DELETE_CLASS = 'DELETE_CLASS',
  DELETE_CLASS_REQUEST = 'DELETE_CLASS_REQUEST',
  DELETE_CLASS_SUCCESS = 'DELETE_CLASS_SUCCESS',
  DELETE_CLASS_FAILED = 'DELETE_CLASS_FAILED',
}

// TYPES

export type TDeleteClassRequest = {
  type: EDeleteClassAction.DELETE_CLASS_REQUEST;
  payload: {
    materials: TDeleteClassMaterials;
    successCallback?: (response: TDeleteClassResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteClassSuccess = {
  type: EDeleteClassAction.DELETE_CLASS_SUCCESS;
  payload: { response: TDeleteClassResponse };
};

export type TDeleteClassFailed = { type: EDeleteClassAction.DELETE_CLASS_FAILED };

// FUNCTION

export const deleteClassAction = {
  request: createActionCreator(
    EDeleteClassAction.DELETE_CLASS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteClassMaterials,
        successCallback?: (response: TDeleteClassResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteClassRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteClassAction.DELETE_CLASS_SUCCESS,
    (resolve) =>
      (response: TDeleteClassResponse): TDeleteClassSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteClassAction.DELETE_CLASS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteClassFailed =>
        resolve({ error }),
  ),
};
