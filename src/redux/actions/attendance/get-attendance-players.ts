import { createActionCreator } from 'deox';

import {
  TGetAttendancePlayersMaterials,
  TGetAttendancePlayersResponse,
} from '@/services/api/attendance/get-attendance-players';

// CONSTANTS

export enum EGetAttendancePlayersAction {
  GET_ATTENDANCE_PLAYERS = 'GET_ATTENDANCE_PLAYERS',
  GET_ATTENDANCE_PLAYERS_REQUEST = 'GET_ATTENDANCE_PLAYERS_REQUEST',
  GET_ATTENDANCE_PLAYERS_SUCCESS = 'GET_ATTENDANCE_PLAYERS_SUCCESS',
  GET_ATTENDANCE_PLAYERS_FAILED = 'GET_ATTENDANCE_PLAYERS_FAILED',
}

// TYPES

export type TGetAttendancePlayersRequest = {
  type: EGetAttendancePlayersAction.GET_ATTENDANCE_PLAYERS_REQUEST;
  payload: {
    materials: TGetAttendancePlayersMaterials;
    successCallback?: (response: TGetAttendancePlayersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetAttendancePlayersSuccess = {
  type: EGetAttendancePlayersAction.GET_ATTENDANCE_PLAYERS_SUCCESS;
  payload: { response: TGetAttendancePlayersResponse };
};

export type TGetAttendancePlayersFailed = { type: EGetAttendancePlayersAction.GET_ATTENDANCE_PLAYERS_FAILED };

// FUNCTION

export const getAttendancePlayersAction = {
  request: createActionCreator(
    EGetAttendancePlayersAction.GET_ATTENDANCE_PLAYERS_REQUEST,
    (resolve) =>
      (
        materials: TGetAttendancePlayersMaterials,
        successCallback?: (response: TGetAttendancePlayersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetAttendancePlayersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetAttendancePlayersAction.GET_ATTENDANCE_PLAYERS_SUCCESS,
    (resolve) =>
      (response: TGetAttendancePlayersResponse): TGetAttendancePlayersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetAttendancePlayersAction.GET_ATTENDANCE_PLAYERS_FAILED,
    (resolve) =>
      (error: unknown): TGetAttendancePlayersFailed =>
        resolve({ error }),
  ),
};
