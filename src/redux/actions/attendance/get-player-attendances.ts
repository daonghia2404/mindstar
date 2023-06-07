import { createActionCreator } from 'deox';

import {
  TGetPlayerAttendancesMaterials,
  TGetPlayerAttendancesResponse,
} from '@/services/api/attendance/get-player-attendances';

// CONSTANTS

export enum EGetPlayerAttendancesAction {
  GET_PLAYER_ATTENDANCES = 'GET_PLAYER_ATTENDANCES',
  GET_PLAYER_ATTENDANCES_REQUEST = 'GET_PLAYER_ATTENDANCES_REQUEST',
  GET_PLAYER_ATTENDANCES_SUCCESS = 'GET_PLAYER_ATTENDANCES_SUCCESS',
  GET_PLAYER_ATTENDANCES_FAILED = 'GET_PLAYER_ATTENDANCES_FAILED',
}

// TYPES

export type TGetPlayerAttendancesRequest = {
  type: EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES_REQUEST;
  payload: {
    materials: TGetPlayerAttendancesMaterials;
    successCallback?: (response: TGetPlayerAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPlayerAttendancesSuccess = {
  type: EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES_SUCCESS;
  payload: { response: TGetPlayerAttendancesResponse };
};

export type TGetPlayerAttendancesFailed = { type: EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES_FAILED };

// FUNCTION

export const getPlayerAttendancesAction = {
  request: createActionCreator(
    EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TGetPlayerAttendancesMaterials,
        successCallback?: (response: TGetPlayerAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPlayerAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TGetPlayerAttendancesResponse): TGetPlayerAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPlayerAttendancesAction.GET_PLAYER_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TGetPlayerAttendancesFailed =>
        resolve({ error }),
  ),
};
