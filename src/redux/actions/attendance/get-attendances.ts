import { createActionCreator } from 'deox';

import { TGetAttendancesMaterials, TGetAttendancesResponse } from '@/services/api/attendance/get-attendances';

// CONSTANTS

export enum EGetAttendancesAction {
  GET_ATTENDANCES = 'GET_ATTENDANCES',
  GET_ATTENDANCES_REQUEST = 'GET_ATTENDANCES_REQUEST',
  GET_ATTENDANCES_SUCCESS = 'GET_ATTENDANCES_SUCCESS',
  GET_ATTENDANCES_FAILED = 'GET_ATTENDANCES_FAILED',
}

// TYPES

export type TGetAttendancesRequest = {
  type: EGetAttendancesAction.GET_ATTENDANCES_REQUEST;
  payload: {
    materials: TGetAttendancesMaterials;
    successCallback?: (response: TGetAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetAttendancesSuccess = {
  type: EGetAttendancesAction.GET_ATTENDANCES_SUCCESS;
  payload: { response: TGetAttendancesResponse };
};

export type TGetAttendancesFailed = { type: EGetAttendancesAction.GET_ATTENDANCES_FAILED };

// FUNCTION

export const getAttendancesAction = {
  request: createActionCreator(
    EGetAttendancesAction.GET_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TGetAttendancesMaterials,
        successCallback?: (response: TGetAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetAttendancesAction.GET_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TGetAttendancesResponse): TGetAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetAttendancesAction.GET_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TGetAttendancesFailed =>
        resolve({ error }),
  ),
};
