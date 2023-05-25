import { createActionCreator } from 'deox';

import { TGetEventsMaterials, TGetEventsResponse } from '@/services/api/event/get-events';

// CONSTANTS

export enum EGetEventsAction {
  GET_EVENTS = 'GET_EVENTS',
  GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST',
  GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS',
  GET_EVENTS_FAILED = 'GET_EVENTS_FAILED',
}

// TYPES

export type TGetEventsRequest = {
  type: EGetEventsAction.GET_EVENTS_REQUEST;
  payload: {
    materials: TGetEventsMaterials;
    successCallback?: (response: TGetEventsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetEventsSuccess = {
  type: EGetEventsAction.GET_EVENTS_SUCCESS;
  payload: { response: TGetEventsResponse };
};

export type TGetEventsFailed = { type: EGetEventsAction.GET_EVENTS_FAILED };

// FUNCTION

export const getEventsAction = {
  request: createActionCreator(
    EGetEventsAction.GET_EVENTS_REQUEST,
    (resolve) =>
      (
        materials: TGetEventsMaterials,
        successCallback?: (response: TGetEventsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetEventsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetEventsAction.GET_EVENTS_SUCCESS,
    (resolve) =>
      (response: TGetEventsResponse): TGetEventsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetEventsAction.GET_EVENTS_FAILED,
    (resolve) =>
      (error: unknown): TGetEventsFailed =>
        resolve({ error }),
  ),
};
