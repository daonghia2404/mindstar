import { createActionCreator } from 'deox';

import { TUpdateAttendancesMaterials, TUpdateAttendancesResponse } from '@/services/api/attendance/update-attendances';

// CONSTANTS

export enum EUpdateAttendancesAction {
  UPDATE_ATTENDANCES = 'UPDATE_ATTENDANCES',
  UPDATE_ATTENDANCES_REQUEST = 'UPDATE_ATTENDANCES_REQUEST',
  UPDATE_ATTENDANCES_SUCCESS = 'UPDATE_ATTENDANCES_SUCCESS',
  UPDATE_ATTENDANCES_FAILED = 'UPDATE_ATTENDANCES_FAILED',
}

// TYPES

export type TUpdateAttendancesRequest = {
  type: EUpdateAttendancesAction.UPDATE_ATTENDANCES_REQUEST;
  payload: {
    materials: TUpdateAttendancesMaterials;
    successCallback?: (response: TUpdateAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateAttendancesSuccess = {
  type: EUpdateAttendancesAction.UPDATE_ATTENDANCES_SUCCESS;
  payload: { response: TUpdateAttendancesResponse };
};

export type TUpdateAttendancesFailed = { type: EUpdateAttendancesAction.UPDATE_ATTENDANCES_FAILED };

// FUNCTION

export const updateAttendancesAction = {
  request: createActionCreator(
    EUpdateAttendancesAction.UPDATE_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TUpdateAttendancesMaterials,
        successCallback?: (response: TUpdateAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateAttendancesAction.UPDATE_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TUpdateAttendancesResponse): TUpdateAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateAttendancesAction.UPDATE_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TUpdateAttendancesFailed =>
        resolve({ error }),
  ),
};
