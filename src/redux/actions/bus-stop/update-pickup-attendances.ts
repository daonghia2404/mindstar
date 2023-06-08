import { createActionCreator } from 'deox';

import {
  TUpdatePickupAttendancesMaterials,
  TUpdatePickupAttendancesResponse,
} from '@/services/api/bus-stop/update-pickup-attendances';

// CONSTANTS

export enum EUpdatePickupAttendancesAction {
  UPDATE_PICKUP_ATTENDANCES = 'UPDATE_PICKUP_ATTENDANCES',
  UPDATE_PICKUP_ATTENDANCES_REQUEST = 'UPDATE_PICKUP_ATTENDANCES_REQUEST',
  UPDATE_PICKUP_ATTENDANCES_SUCCESS = 'UPDATE_PICKUP_ATTENDANCES_SUCCESS',
  UPDATE_PICKUP_ATTENDANCES_FAILED = 'UPDATE_PICKUP_ATTENDANCES_FAILED',
}

// TYPES

export type TUpdatePickupAttendancesRequest = {
  type: EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES_REQUEST;
  payload: {
    materials: TUpdatePickupAttendancesMaterials;
    successCallback?: (response: TUpdatePickupAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdatePickupAttendancesSuccess = {
  type: EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES_SUCCESS;
  payload: { response: TUpdatePickupAttendancesResponse };
};

export type TUpdatePickupAttendancesFailed = { type: EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES_FAILED };

// FUNCTION

export const updatePickupAttendancesAction = {
  request: createActionCreator(
    EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TUpdatePickupAttendancesMaterials,
        successCallback?: (response: TUpdatePickupAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdatePickupAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TUpdatePickupAttendancesResponse): TUpdatePickupAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TUpdatePickupAttendancesFailed =>
        resolve({ error }),
  ),
};
