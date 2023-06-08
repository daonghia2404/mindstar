import { createActionCreator } from 'deox';

import { TDeleteBusStopMaterials, TDeleteBusStopResponse } from '@/services/api/bus-stop/delete-bus-stop';

// CONSTANTS

export enum EDeleteBusStopAction {
  DELETE_BUS_STOP = 'DELETE_BUS_STOP',
  DELETE_BUS_STOP_REQUEST = 'DELETE_BUS_STOP_REQUEST',
  DELETE_BUS_STOP_SUCCESS = 'DELETE_BUS_STOP_SUCCESS',
  DELETE_BUS_STOP_FAILED = 'DELETE_BUS_STOP_FAILED',
}

// TYPES

export type TDeleteBusStopRequest = {
  type: EDeleteBusStopAction.DELETE_BUS_STOP_REQUEST;
  payload: {
    materials: TDeleteBusStopMaterials;
    successCallback?: (response: TDeleteBusStopResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteBusStopSuccess = {
  type: EDeleteBusStopAction.DELETE_BUS_STOP_SUCCESS;
  payload: { response: TDeleteBusStopResponse };
};

export type TDeleteBusStopFailed = { type: EDeleteBusStopAction.DELETE_BUS_STOP_FAILED };

// FUNCTION

export const deleteBusStopAction = {
  request: createActionCreator(
    EDeleteBusStopAction.DELETE_BUS_STOP_REQUEST,
    (resolve) =>
      (
        materials: TDeleteBusStopMaterials,
        successCallback?: (response: TDeleteBusStopResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteBusStopRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteBusStopAction.DELETE_BUS_STOP_SUCCESS,
    (resolve) =>
      (response: TDeleteBusStopResponse): TDeleteBusStopSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteBusStopAction.DELETE_BUS_STOP_FAILED,
    (resolve) =>
      (error: unknown): TDeleteBusStopFailed =>
        resolve({ error }),
  ),
};
