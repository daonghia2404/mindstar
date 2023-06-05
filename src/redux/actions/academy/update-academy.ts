import { createActionCreator } from 'deox';

import { TUpdateAcademyMaterials, TUpdateAcademyResponse } from '@/services/api/academy/update-academy';

// CONSTANTS

export enum EUpdateAcademyAction {
  UPDATE_ACADEMY = 'UPDATE_ACADEMY',
  UPDATE_ACADEMY_REQUEST = 'UPDATE_ACADEMY_REQUEST',
  UPDATE_ACADEMY_SUCCESS = 'UPDATE_ACADEMY_SUCCESS',
  UPDATE_ACADEMY_FAILED = 'UPDATE_ACADEMY_FAILED',
}

// TYPES

export type TUpdateAcademyRequest = {
  type: EUpdateAcademyAction.UPDATE_ACADEMY_REQUEST;
  payload: {
    materials: TUpdateAcademyMaterials;
    successCallback?: (response: TUpdateAcademyResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateAcademySuccess = {
  type: EUpdateAcademyAction.UPDATE_ACADEMY_SUCCESS;
  payload: { response: TUpdateAcademyResponse };
};

export type TUpdateAcademyFailed = { type: EUpdateAcademyAction.UPDATE_ACADEMY_FAILED };

// FUNCTION

export const updateAcademyAction = {
  request: createActionCreator(
    EUpdateAcademyAction.UPDATE_ACADEMY_REQUEST,
    (resolve) =>
      (
        materials: TUpdateAcademyMaterials,
        successCallback?: (response: TUpdateAcademyResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateAcademyRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateAcademyAction.UPDATE_ACADEMY_SUCCESS,
    (resolve) =>
      (response: TUpdateAcademyResponse): TUpdateAcademySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateAcademyAction.UPDATE_ACADEMY_FAILED,
    (resolve) =>
      (error: unknown): TUpdateAcademyFailed =>
        resolve({ error }),
  ),
};
