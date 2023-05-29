import { createActionCreator } from 'deox';

import { TUpdateClassMaterials, TUpdateClassResponse } from '@/services/api/class/update-class';

// CONSTANTS

export enum EUpdateClassAction {
  UPDATE_CLASS = 'UPDATE_CLASS',
  UPDATE_CLASS_REQUEST = 'UPDATE_CLASS_REQUEST',
  UPDATE_CLASS_SUCCESS = 'UPDATE_CLASS_SUCCESS',
  UPDATE_CLASS_FAILED = 'UPDATE_CLASS_FAILED',
}

// TYPES

export type TUpdateClassRequest = {
  type: EUpdateClassAction.UPDATE_CLASS_REQUEST;
  payload: {
    materials: TUpdateClassMaterials;
    successCallback?: (response: TUpdateClassResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateClassSuccess = {
  type: EUpdateClassAction.UPDATE_CLASS_SUCCESS;
  payload: { response: TUpdateClassResponse };
};

export type TUpdateClassFailed = { type: EUpdateClassAction.UPDATE_CLASS_FAILED };

// FUNCTION

export const updateClassAction = {
  request: createActionCreator(
    EUpdateClassAction.UPDATE_CLASS_REQUEST,
    (resolve) =>
      (
        materials: TUpdateClassMaterials,
        successCallback?: (response: TUpdateClassResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateClassRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateClassAction.UPDATE_CLASS_SUCCESS,
    (resolve) =>
      (response: TUpdateClassResponse): TUpdateClassSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateClassAction.UPDATE_CLASS_FAILED,
    (resolve) =>
      (error: unknown): TUpdateClassFailed =>
        resolve({ error }),
  ),
};
