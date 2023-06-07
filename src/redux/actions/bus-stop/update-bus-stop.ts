import { createActionCreator } from 'deox';

import { TUpdateBusStopMaterials, TUpdateBusStopResponse } from '@/services/api/bus-stop/update-bus-stop';

// CONSTANTS

export enum EUpdateBusStopAction {
  UPDATE_BUS_STOP = 'UPDATE_BUS_STOP',
  UPDATE_BUS_STOP_REQUEST = 'UPDATE_BUS_STOP_REQUEST',
  UPDATE_BUS_STOP_SUCCESS = 'UPDATE_BUS_STOP_SUCCESS',
  UPDATE_BUS_STOP_FAILED = 'UPDATE_BUS_STOP_FAILED',
}

// TYPES

export type TUpdateBusStopRequest = {
  type: EUpdateBusStopAction.UPDATE_BUS_STOP_REQUEST;
  payload: {
    materials: TUpdateBusStopMaterials;
    successCallback?: (response: TUpdateBusStopResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateBusStopSuccess = {
  type: EUpdateBusStopAction.UPDATE_BUS_STOP_SUCCESS;
  payload: { response: TUpdateBusStopResponse };
};

export type TUpdateBusStopFailed = { type: EUpdateBusStopAction.UPDATE_BUS_STOP_FAILED };

// FUNCTION

export const updateBusStopAction = {
  request: createActionCreator(
    EUpdateBusStopAction.UPDATE_BUS_STOP_REQUEST,
    (resolve) =>
      (
        materials: TUpdateBusStopMaterials,
        successCallback?: (response: TUpdateBusStopResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateBusStopRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateBusStopAction.UPDATE_BUS_STOP_SUCCESS,
    (resolve) =>
      (response: TUpdateBusStopResponse): TUpdateBusStopSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateBusStopAction.UPDATE_BUS_STOP_FAILED,
    (resolve) =>
      (error: unknown): TUpdateBusStopFailed =>
        resolve({ error }),
  ),
};
