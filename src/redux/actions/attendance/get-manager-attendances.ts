import { createActionCreator } from 'deox';

import {
  TGetManagerAttendancesMaterials,
  TGetManagerAttendancesResponse,
} from '@/services/api/attendance/get-manager-attendances';

// CONSTANTS

export enum EGetManagerAttendancesAction {
  GET_MANAGER_ATTENDANCES = 'GET_MANAGER_ATTENDANCES',
  GET_MANAGER_ATTENDANCES_REQUEST = 'GET_MANAGER_ATTENDANCES_REQUEST',
  GET_MANAGER_ATTENDANCES_SUCCESS = 'GET_MANAGER_ATTENDANCES_SUCCESS',
  GET_MANAGER_ATTENDANCES_FAILED = 'GET_MANAGER_ATTENDANCES_FAILED',
}

// TYPES

export type TGetManagerAttendancesRequest = {
  type: EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES_REQUEST;
  payload: {
    materials: TGetManagerAttendancesMaterials;
    successCallback?: (response: TGetManagerAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetManagerAttendancesSuccess = {
  type: EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES_SUCCESS;
  payload: { response: TGetManagerAttendancesResponse };
};

export type TGetManagerAttendancesFailed = { type: EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES_FAILED };

// FUNCTION

export const getManagerAttendancesAction = {
  request: createActionCreator(
    EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TGetManagerAttendancesMaterials,
        successCallback?: (response: TGetManagerAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetManagerAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TGetManagerAttendancesResponse): TGetManagerAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetManagerAttendancesAction.GET_MANAGER_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TGetManagerAttendancesFailed =>
        resolve({ error }),
  ),
};
