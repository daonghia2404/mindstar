import { createActionCreator } from 'deox';

import {
  TGetPickupAttendancesMaterials,
  TGetPickupAttendancesResponse,
} from '@/services/api/bus-stop/get-pickup-attendances';

// CONSTANTS

export enum EGetPickupAttendancesAction {
  GET_PICKUP_ATTENDANCES = 'GET_PICKUP_ATTENDANCES',
  GET_PICKUP_ATTENDANCES_REQUEST = 'GET_PICKUP_ATTENDANCES_REQUEST',
  GET_PICKUP_ATTENDANCES_SUCCESS = 'GET_PICKUP_ATTENDANCES_SUCCESS',
  GET_PICKUP_ATTENDANCES_FAILED = 'GET_PICKUP_ATTENDANCES_FAILED',
}

// TYPES

export type TGetPickupAttendancesRequest = {
  type: EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES_REQUEST;
  payload: {
    materials: TGetPickupAttendancesMaterials;
    successCallback?: (response: TGetPickupAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPickupAttendancesSuccess = {
  type: EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES_SUCCESS;
  payload: { response: TGetPickupAttendancesResponse };
};

export type TGetPickupAttendancesFailed = { type: EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES_FAILED };

// FUNCTION

export const getPickupAttendancesAction = {
  request: createActionCreator(
    EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TGetPickupAttendancesMaterials,
        successCallback?: (response: TGetPickupAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPickupAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TGetPickupAttendancesResponse): TGetPickupAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TGetPickupAttendancesFailed =>
        resolve({ error }),
  ),
};
