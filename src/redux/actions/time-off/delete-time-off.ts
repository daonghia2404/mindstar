import { createActionCreator } from 'deox';

import { TDeleteTimeOffMaterials, TDeleteTimeOffResponse } from '@/services/api/time-off/delete-time-off';

// CONSTANTS

export enum EDeleteTimeOffAction {
  DELETE_TIME_OFF = 'DELETE_TIME_OFF',
  DELETE_TIME_OFF_REQUEST = 'DELETE_TIME_OFF_REQUEST',
  DELETE_TIME_OFF_SUCCESS = 'DELETE_TIME_OFF_SUCCESS',
  DELETE_TIME_OFF_FAILED = 'DELETE_TIME_OFF_FAILED',
}

// TYPES

export type TDeleteTimeOffRequest = {
  type: EDeleteTimeOffAction.DELETE_TIME_OFF_REQUEST;
  payload: {
    materials: TDeleteTimeOffMaterials;
    successCallback?: (response: TDeleteTimeOffResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteTimeOffSuccess = {
  type: EDeleteTimeOffAction.DELETE_TIME_OFF_SUCCESS;
  payload: { response: TDeleteTimeOffResponse };
};

export type TDeleteTimeOffFailed = { type: EDeleteTimeOffAction.DELETE_TIME_OFF_FAILED };

// FUNCTION

export const deleteTimeOffAction = {
  request: createActionCreator(
    EDeleteTimeOffAction.DELETE_TIME_OFF_REQUEST,
    (resolve) =>
      (
        materials: TDeleteTimeOffMaterials,
        successCallback?: (response: TDeleteTimeOffResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteTimeOffRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteTimeOffAction.DELETE_TIME_OFF_SUCCESS,
    (resolve) =>
      (response: TDeleteTimeOffResponse): TDeleteTimeOffSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteTimeOffAction.DELETE_TIME_OFF_FAILED,
    (resolve) =>
      (error: unknown): TDeleteTimeOffFailed =>
        resolve({ error }),
  ),
};
