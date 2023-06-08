import { createActionCreator } from 'deox';

import { TCreateBusStopMaterials, TCreateBusStopResponse } from '@/services/api/bus-stop/create-bus-stop';

// CONSTANTS

export enum ECreateBusStopAction {
  CREATE_BUS_STOP = 'CREATE_BUS_STOP',
  CREATE_BUS_STOP_REQUEST = 'CREATE_BUS_STOP_REQUEST',
  CREATE_BUS_STOP_SUCCESS = 'CREATE_BUS_STOP_SUCCESS',
  CREATE_BUS_STOP_FAILED = 'CREATE_BUS_STOP_FAILED',
}

// TYPES

export type TCreateBusStopRequest = {
  type: ECreateBusStopAction.CREATE_BUS_STOP_REQUEST;
  payload: {
    materials: TCreateBusStopMaterials;
    successCallback?: (response: TCreateBusStopResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateBusStopSuccess = {
  type: ECreateBusStopAction.CREATE_BUS_STOP_SUCCESS;
  payload: { response: TCreateBusStopResponse };
};

export type TCreateBusStopFailed = { type: ECreateBusStopAction.CREATE_BUS_STOP_FAILED };

// FUNCTION

export const createBusStopAction = {
  request: createActionCreator(
    ECreateBusStopAction.CREATE_BUS_STOP_REQUEST,
    (resolve) =>
      (
        materials: TCreateBusStopMaterials,
        successCallback?: (response: TCreateBusStopResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateBusStopRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateBusStopAction.CREATE_BUS_STOP_SUCCESS,
    (resolve) =>
      (response: TCreateBusStopResponse): TCreateBusStopSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateBusStopAction.CREATE_BUS_STOP_FAILED,
    (resolve) =>
      (error: unknown): TCreateBusStopFailed =>
        resolve({ error }),
  ),
};
