import { createActionCreator } from 'deox';

import { TGetMyAcademyMaterials, TGetMyAcademyResponse } from '@/services/api/academy/get-my-academy';

// CONSTANTS

export enum EGetMyAcademyAction {
  GET_MY_ACADEMY = 'GET_MY_ACADEMY',
  GET_MY_ACADEMY_REQUEST = 'GET_MY_ACADEMY_REQUEST',
  GET_MY_ACADEMY_SUCCESS = 'GET_MY_ACADEMY_SUCCESS',
  GET_MY_ACADEMY_FAILED = 'GET_MY_ACADEMY_FAILED',
}

// TYPES

export type TGetMyAcademyRequest = {
  type: EGetMyAcademyAction.GET_MY_ACADEMY_REQUEST;
  payload: {
    materials: TGetMyAcademyMaterials;
    successCallback?: (response: TGetMyAcademyResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMyAcademySuccess = {
  type: EGetMyAcademyAction.GET_MY_ACADEMY_SUCCESS;
  payload: { response: TGetMyAcademyResponse };
};

export type TGetMyAcademyFailed = { type: EGetMyAcademyAction.GET_MY_ACADEMY_FAILED };

// FUNCTION

export const getMyAcademyAction = {
  request: createActionCreator(
    EGetMyAcademyAction.GET_MY_ACADEMY_REQUEST,
    (resolve) =>
      (
        materials: TGetMyAcademyMaterials,
        successCallback?: (response: TGetMyAcademyResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMyAcademyRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMyAcademyAction.GET_MY_ACADEMY_SUCCESS,
    (resolve) =>
      (response: TGetMyAcademyResponse): TGetMyAcademySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMyAcademyAction.GET_MY_ACADEMY_FAILED,
    (resolve) =>
      (error: unknown): TGetMyAcademyFailed =>
        resolve({ error }),
  ),
};
