import { createActionCreator } from 'deox';

import { TGetClassesMaterials, TGetClassesResponse } from '@/services/api/class/get-classes';

// CONSTANTS

export enum EGetClassesAction {
  GET_CLASSES = 'GET_CLASSES',
  GET_CLASSES_REQUEST = 'GET_CLASSES_REQUEST',
  GET_CLASSES_SUCCESS = 'GET_CLASSES_SUCCESS',
  GET_CLASSES_FAILED = 'GET_CLASSES_FAILED',
}

// TYPES

export type TGetClassesRequest = {
  type: EGetClassesAction.GET_CLASSES_REQUEST;
  payload: {
    materials: TGetClassesMaterials;
    successCallback?: (response: TGetClassesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetClassesSuccess = {
  type: EGetClassesAction.GET_CLASSES_SUCCESS;
  payload: { response: TGetClassesResponse };
};

export type TGetClassesFailed = { type: EGetClassesAction.GET_CLASSES_FAILED };

// FUNCTION

export const getClassesAction = {
  request: createActionCreator(
    EGetClassesAction.GET_CLASSES_REQUEST,
    (resolve) =>
      (
        materials: TGetClassesMaterials,
        successCallback?: (response: TGetClassesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetClassesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetClassesAction.GET_CLASSES_SUCCESS,
    (resolve) =>
      (response: TGetClassesResponse): TGetClassesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetClassesAction.GET_CLASSES_FAILED,
    (resolve) =>
      (error: unknown): TGetClassesFailed =>
        resolve({ error }),
  ),
};
