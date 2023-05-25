import { createActionCreator } from 'deox';

import { TDeleteEventMaterials, TDeleteEventResponse } from '@/services/api/event/delete-event';

// CONSTANTS

export enum EDeleteEventAction {
  DELETE_EVENT = 'DELETE_EVENT',
  DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST',
  DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILED = 'DELETE_EVENT_FAILED',
}

// TYPES

export type TDeleteEventRequest = {
  type: EDeleteEventAction.DELETE_EVENT_REQUEST;
  payload: {
    materials: TDeleteEventMaterials;
    successCallback?: (response: TDeleteEventResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteEventSuccess = {
  type: EDeleteEventAction.DELETE_EVENT_SUCCESS;
  payload: { response: TDeleteEventResponse };
};

export type TDeleteEventFailed = { type: EDeleteEventAction.DELETE_EVENT_FAILED };

// FUNCTION

export const deleteEventAction = {
  request: createActionCreator(
    EDeleteEventAction.DELETE_EVENT_REQUEST,
    (resolve) =>
      (
        materials: TDeleteEventMaterials,
        successCallback?: (response: TDeleteEventResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteEventRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteEventAction.DELETE_EVENT_SUCCESS,
    (resolve) =>
      (response: TDeleteEventResponse): TDeleteEventSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteEventAction.DELETE_EVENT_FAILED,
    (resolve) =>
      (error: unknown): TDeleteEventFailed =>
        resolve({ error }),
  ),
};
