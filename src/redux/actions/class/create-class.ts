import { createActionCreator } from 'deox';

import { TCreateClassMaterials, TCreateClassResponse } from '@/services/api/class/create-class';

// CONSTANTS

export enum ECreateClassAction {
  CREATE_CLASS = 'CREATE_CLASS',
  CREATE_CLASS_REQUEST = 'CREATE_CLASS_REQUEST',
  CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS',
  CREATE_CLASS_FAILED = 'CREATE_CLASS_FAILED',
}

// TYPES

export type TCreateClassRequest = {
  type: ECreateClassAction.CREATE_CLASS_REQUEST;
  payload: {
    materials: TCreateClassMaterials;
    successCallback?: (response: TCreateClassResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateClassSuccess = {
  type: ECreateClassAction.CREATE_CLASS_SUCCESS;
  payload: { response: TCreateClassResponse };
};

export type TCreateClassFailed = { type: ECreateClassAction.CREATE_CLASS_FAILED };

// FUNCTION

export const createClassAction = {
  request: createActionCreator(
    ECreateClassAction.CREATE_CLASS_REQUEST,
    (resolve) =>
      (
        materials: TCreateClassMaterials,
        successCallback?: (response: TCreateClassResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateClassRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateClassAction.CREATE_CLASS_SUCCESS,
    (resolve) =>
      (response: TCreateClassResponse): TCreateClassSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateClassAction.CREATE_CLASS_FAILED,
    (resolve) =>
      (error: unknown): TCreateClassFailed =>
        resolve({ error }),
  ),
};
