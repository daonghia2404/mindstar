import { createActionCreator } from 'deox';

import { TGetSchedulesMaterials, TGetSchedulesResponse } from '@/services/api/schedule/get-schedules';

// CONSTANTS

export enum EGetSchedulesAction {
  GET_SCHEDULES = 'GET_SCHEDULES',
  GET_SCHEDULES_REQUEST = 'GET_SCHEDULES_REQUEST',
  GET_SCHEDULES_SUCCESS = 'GET_SCHEDULES_SUCCESS',
  GET_SCHEDULES_FAILED = 'GET_SCHEDULES_FAILED',
}

// TYPES

export type TGetSchedulesRequest = {
  type: EGetSchedulesAction.GET_SCHEDULES_REQUEST;
  payload: {
    materials: TGetSchedulesMaterials;
    successCallback?: (response: TGetSchedulesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetSchedulesSuccess = {
  type: EGetSchedulesAction.GET_SCHEDULES_SUCCESS;
  payload: { response: TGetSchedulesResponse };
};

export type TGetSchedulesFailed = { type: EGetSchedulesAction.GET_SCHEDULES_FAILED };

// FUNCTION

export const getSchedulesAction = {
  request: createActionCreator(
    EGetSchedulesAction.GET_SCHEDULES_REQUEST,
    (resolve) =>
      (
        materials: TGetSchedulesMaterials,
        successCallback?: (response: TGetSchedulesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetSchedulesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetSchedulesAction.GET_SCHEDULES_SUCCESS,
    (resolve) =>
      (response: TGetSchedulesResponse): TGetSchedulesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetSchedulesAction.GET_SCHEDULES_FAILED,
    (resolve) =>
      (error: unknown): TGetSchedulesFailed =>
        resolve({ error }),
  ),
};
