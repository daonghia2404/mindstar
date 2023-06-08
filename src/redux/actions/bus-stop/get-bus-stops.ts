import { createActionCreator } from 'deox';

import { TGetBusStopsMaterials, TGetBusStopsResponse } from '@/services/api/bus-stop/get-bus-stops';

// CONSTANTS

export enum EGetBusStopsAction {
  GET_BUS_STOPS = 'GET_BUS_STOPS',
  GET_BUS_STOPS_REQUEST = 'GET_BUS_STOPS_REQUEST',
  GET_BUS_STOPS_SUCCESS = 'GET_BUS_STOPS_SUCCESS',
  GET_BUS_STOPS_FAILED = 'GET_BUS_STOPS_FAILED',
}

// TYPES

export type TGetBusStopsRequest = {
  type: EGetBusStopsAction.GET_BUS_STOPS_REQUEST;
  payload: {
    materials: TGetBusStopsMaterials;
    successCallback?: (response: TGetBusStopsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetBusStopsSuccess = {
  type: EGetBusStopsAction.GET_BUS_STOPS_SUCCESS;
  payload: { response: TGetBusStopsResponse };
};

export type TGetBusStopsFailed = { type: EGetBusStopsAction.GET_BUS_STOPS_FAILED };

// FUNCTION

export const getBusStopsAction = {
  request: createActionCreator(
    EGetBusStopsAction.GET_BUS_STOPS_REQUEST,
    (resolve) =>
      (
        materials: TGetBusStopsMaterials,
        successCallback?: (response: TGetBusStopsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetBusStopsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetBusStopsAction.GET_BUS_STOPS_SUCCESS,
    (resolve) =>
      (response: TGetBusStopsResponse): TGetBusStopsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetBusStopsAction.GET_BUS_STOPS_FAILED,
    (resolve) =>
      (error: unknown): TGetBusStopsFailed =>
        resolve({ error }),
  ),
};
