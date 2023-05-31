import { createActionCreator } from 'deox';

import { TDeletePracticeMaterials, TDeletePracticeResponse } from '@/services/api/practice/delete-practice';

// CONSTANTS

export enum EDeletePracticeAction {
  DELETE_PRACTICE = 'DELETE_PRACTICE',
  DELETE_PRACTICE_REQUEST = 'DELETE_PRACTICE_REQUEST',
  DELETE_PRACTICE_SUCCESS = 'DELETE_PRACTICE_SUCCESS',
  DELETE_PRACTICE_FAILED = 'DELETE_PRACTICE_FAILED',
}

// TYPES

export type TDeletePracticeRequest = {
  type: EDeletePracticeAction.DELETE_PRACTICE_REQUEST;
  payload: {
    materials: TDeletePracticeMaterials;
    successCallback?: (response: TDeletePracticeResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeletePracticeSuccess = {
  type: EDeletePracticeAction.DELETE_PRACTICE_SUCCESS;
  payload: { response: TDeletePracticeResponse };
};

export type TDeletePracticeFailed = { type: EDeletePracticeAction.DELETE_PRACTICE_FAILED };

// FUNCTION

export const deletePracticeAction = {
  request: createActionCreator(
    EDeletePracticeAction.DELETE_PRACTICE_REQUEST,
    (resolve) =>
      (
        materials: TDeletePracticeMaterials,
        successCallback?: (response: TDeletePracticeResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeletePracticeRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeletePracticeAction.DELETE_PRACTICE_SUCCESS,
    (resolve) =>
      (response: TDeletePracticeResponse): TDeletePracticeSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeletePracticeAction.DELETE_PRACTICE_FAILED,
    (resolve) =>
      (error: unknown): TDeletePracticeFailed =>
        resolve({ error }),
  ),
};
