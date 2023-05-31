import { createActionCreator } from 'deox';

import { TUpdatePracticeMaterials, TUpdatePracticeResponse } from '@/services/api/practice/update-practice';

// CONSTANTS

export enum EUpdatePracticeAction {
  UPDATE_PRACTICE = 'UPDATE_PRACTICE',
  UPDATE_PRACTICE_REQUEST = 'UPDATE_PRACTICE_REQUEST',
  UPDATE_PRACTICE_SUCCESS = 'UPDATE_PRACTICE_SUCCESS',
  UPDATE_PRACTICE_FAILED = 'UPDATE_PRACTICE_FAILED',
}

// TYPES

export type TUpdatePracticeRequest = {
  type: EUpdatePracticeAction.UPDATE_PRACTICE_REQUEST;
  payload: {
    materials: TUpdatePracticeMaterials;
    successCallback?: (response: TUpdatePracticeResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdatePracticeSuccess = {
  type: EUpdatePracticeAction.UPDATE_PRACTICE_SUCCESS;
  payload: { response: TUpdatePracticeResponse };
};

export type TUpdatePracticeFailed = { type: EUpdatePracticeAction.UPDATE_PRACTICE_FAILED };

// FUNCTION

export const updatePracticeAction = {
  request: createActionCreator(
    EUpdatePracticeAction.UPDATE_PRACTICE_REQUEST,
    (resolve) =>
      (
        materials: TUpdatePracticeMaterials,
        successCallback?: (response: TUpdatePracticeResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdatePracticeRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdatePracticeAction.UPDATE_PRACTICE_SUCCESS,
    (resolve) =>
      (response: TUpdatePracticeResponse): TUpdatePracticeSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdatePracticeAction.UPDATE_PRACTICE_FAILED,
    (resolve) =>
      (error: unknown): TUpdatePracticeFailed =>
        resolve({ error }),
  ),
};
