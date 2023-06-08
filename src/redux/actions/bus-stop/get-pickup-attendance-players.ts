import { createActionCreator } from 'deox';

import {
  TGetPickupAttendancePlayersMaterials,
  TGetPickupAttendancePlayersResponse,
} from '@/services/api/bus-stop/get-pickup-attendance-players';

// CONSTANTS

export enum EGetPickupAttendancePlayersAction {
  GET_PICKUP_ATTENDANCE_PLAYERS = 'GET_PICKUP_ATTENDANCE_PLAYERS',
  GET_PICKUP_ATTENDANCE_PLAYERS_REQUEST = 'GET_PICKUP_ATTENDANCE_PLAYERS_REQUEST',
  GET_PICKUP_ATTENDANCE_PLAYERS_SUCCESS = 'GET_PICKUP_ATTENDANCE_PLAYERS_SUCCESS',
  GET_PICKUP_ATTENDANCE_PLAYERS_FAILED = 'GET_PICKUP_ATTENDANCE_PLAYERS_FAILED',
}

// TYPES

export type TGetPickupAttendancePlayersRequest = {
  type: EGetPickupAttendancePlayersAction.GET_PICKUP_ATTENDANCE_PLAYERS_REQUEST;
  payload: {
    materials: TGetPickupAttendancePlayersMaterials;
    successCallback?: (response: TGetPickupAttendancePlayersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPickupAttendancePlayersSuccess = {
  type: EGetPickupAttendancePlayersAction.GET_PICKUP_ATTENDANCE_PLAYERS_SUCCESS;
  payload: { response?: TGetPickupAttendancePlayersResponse };
};

export type TGetPickupAttendancePlayersFailed = {
  type: EGetPickupAttendancePlayersAction.GET_PICKUP_ATTENDANCE_PLAYERS_FAILED;
};

// FUNCTION

export const getPickupAttendancePlayersAction = {
  request: createActionCreator(
    EGetPickupAttendancePlayersAction.GET_PICKUP_ATTENDANCE_PLAYERS_REQUEST,
    (resolve) =>
      (
        materials: TGetPickupAttendancePlayersMaterials,
        successCallback?: (response: TGetPickupAttendancePlayersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPickupAttendancePlayersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPickupAttendancePlayersAction.GET_PICKUP_ATTENDANCE_PLAYERS_SUCCESS,
    (resolve) =>
      (response?: TGetPickupAttendancePlayersResponse): TGetPickupAttendancePlayersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPickupAttendancePlayersAction.GET_PICKUP_ATTENDANCE_PLAYERS_FAILED,
    (resolve) =>
      (error: unknown): TGetPickupAttendancePlayersFailed =>
        resolve({ error }),
  ),
};
