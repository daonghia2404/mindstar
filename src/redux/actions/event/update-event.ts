import { createActionCreator } from 'deox';

import { TUpdateEventMaterials, TUpdateEventResponse } from '@/services/api/event/update-event';

// CONSTANTS

export enum EUpdateEventAction {
  UPDATE_EVENT = 'UPDATE_EVENT',
  UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST',
  UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS',
  UPDATE_EVENT_FAILED = 'UPDATE_EVENT_FAILED',
}

// TYPES

export type TUpdateEventRequest = {
  type: EUpdateEventAction.UPDATE_EVENT_REQUEST;
  payload: {
    materials: TUpdateEventMaterials;
    successCallback?: (response: TUpdateEventResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateEventSuccess = {
  type: EUpdateEventAction.UPDATE_EVENT_SUCCESS;
  payload: { response: TUpdateEventResponse };
};

export type TUpdateEventFailed = { type: EUpdateEventAction.UPDATE_EVENT_FAILED };

// FUNCTION

export const updateEventAction = {
  request: createActionCreator(
    EUpdateEventAction.UPDATE_EVENT_REQUEST,
    (resolve) =>
      (
        materials: TUpdateEventMaterials,
        successCallback?: (response: TUpdateEventResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateEventRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateEventAction.UPDATE_EVENT_SUCCESS,
    (resolve) =>
      (response: TUpdateEventResponse): TUpdateEventSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateEventAction.UPDATE_EVENT_FAILED,
    (resolve) =>
      (error: unknown): TUpdateEventFailed =>
        resolve({ error }),
  ),
};
