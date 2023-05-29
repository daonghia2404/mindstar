import { createActionCreator } from 'deox';

import { TGetTimeOffsMaterials, TGetTimeOffsResponse } from '@/services/api/time-off/get-time-offs';

// CONSTANTS

export enum EGetTimeOffsAction {
  GET_TIME_OFFS = 'GET_TIME_OFFS',
  GET_TIME_OFFS_REQUEST = 'GET_TIME_OFFS_REQUEST',
  GET_TIME_OFFS_SUCCESS = 'GET_TIME_OFFS_SUCCESS',
  GET_TIME_OFFS_FAILED = 'GET_TIME_OFFS_FAILED',
}

// TYPES

export type TGetTimeOffsRequest = {
  type: EGetTimeOffsAction.GET_TIME_OFFS_REQUEST;
  payload: {
    materials: TGetTimeOffsMaterials;
    successCallback?: (response: TGetTimeOffsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetTimeOffsSuccess = {
  type: EGetTimeOffsAction.GET_TIME_OFFS_SUCCESS;
  payload: { response: TGetTimeOffsResponse };
};

export type TGetTimeOffsFailed = { type: EGetTimeOffsAction.GET_TIME_OFFS_FAILED };

// FUNCTION

export const getTimeOffsAction = {
  request: createActionCreator(
    EGetTimeOffsAction.GET_TIME_OFFS_REQUEST,
    (resolve) =>
      (
        materials: TGetTimeOffsMaterials,
        successCallback?: (response: TGetTimeOffsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetTimeOffsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetTimeOffsAction.GET_TIME_OFFS_SUCCESS,
    (resolve) =>
      (response: TGetTimeOffsResponse): TGetTimeOffsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetTimeOffsAction.GET_TIME_OFFS_FAILED,
    (resolve) =>
      (error: unknown): TGetTimeOffsFailed =>
        resolve({ error }),
  ),
};
