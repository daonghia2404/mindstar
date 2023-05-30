import { createActionCreator } from 'deox';

import { TGetPracticesMaterials, TGetPracticesResponse } from '@/services/api/practice/get-practices';

// CONSTANTS

export enum EGetPracticesAction {
  GET_PRACTICES = 'GET_PRACTICES',
  GET_PRACTICES_REQUEST = 'GET_PRACTICES_REQUEST',
  GET_PRACTICES_SUCCESS = 'GET_PRACTICES_SUCCESS',
  GET_PRACTICES_FAILED = 'GET_PRACTICES_FAILED',
}

// TYPES

export type TGetPracticesRequest = {
  type: EGetPracticesAction.GET_PRACTICES_REQUEST;
  payload: {
    materials: TGetPracticesMaterials;
    successCallback?: (response: TGetPracticesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPracticesSuccess = {
  type: EGetPracticesAction.GET_PRACTICES_SUCCESS;
  payload: { response: TGetPracticesResponse };
};

export type TGetPracticesFailed = { type: EGetPracticesAction.GET_PRACTICES_FAILED };

// FUNCTION

export const getPracticesAction = {
  request: createActionCreator(
    EGetPracticesAction.GET_PRACTICES_REQUEST,
    (resolve) =>
      (
        materials: TGetPracticesMaterials,
        successCallback?: (response: TGetPracticesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPracticesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPracticesAction.GET_PRACTICES_SUCCESS,
    (resolve) =>
      (response: TGetPracticesResponse): TGetPracticesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPracticesAction.GET_PRACTICES_FAILED,
    (resolve) =>
      (error: unknown): TGetPracticesFailed =>
        resolve({ error }),
  ),
};
