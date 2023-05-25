import { createActionCreator } from 'deox';

import { TCreateEventMaterials, TCreateEventResponse } from '@/services/api/event/create-event';

// CONSTANTS

export enum ECreateEventAction {
  CREATE_EVENT = 'CREATE_EVENT',
  CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST',
  CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILED = 'CREATE_EVENT_FAILED',
}

// TYPES

export type TCreateEventRequest = {
  type: ECreateEventAction.CREATE_EVENT_REQUEST;
  payload: {
    materials: TCreateEventMaterials;
    successCallback?: (response: TCreateEventResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateEventSuccess = {
  type: ECreateEventAction.CREATE_EVENT_SUCCESS;
  payload: { response: TCreateEventResponse };
};

export type TCreateEventFailed = { type: ECreateEventAction.CREATE_EVENT_FAILED };

// FUNCTION

export const createEventAction = {
  request: createActionCreator(
    ECreateEventAction.CREATE_EVENT_REQUEST,
    (resolve) =>
      (
        materials: TCreateEventMaterials,
        successCallback?: (response: TCreateEventResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateEventRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateEventAction.CREATE_EVENT_SUCCESS,
    (resolve) =>
      (response: TCreateEventResponse): TCreateEventSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateEventAction.CREATE_EVENT_FAILED,
    (resolve) =>
      (error: unknown): TCreateEventFailed =>
        resolve({ error }),
  ),
};
