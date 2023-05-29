import { createActionCreator } from 'deox';

import { TGetEConnectsMaterials, TGetEConnectsResponse } from '@/services/api/e-connect/get-e-connects';

// CONSTANTS

export enum EGetEConnectsAction {
  GET_E_CONNECTS = 'GET_E_CONNECTS',
  GET_E_CONNECTS_REQUEST = 'GET_E_CONNECTS_REQUEST',
  GET_E_CONNECTS_SUCCESS = 'GET_E_CONNECTS_SUCCESS',
  GET_E_CONNECTS_FAILED = 'GET_E_CONNECTS_FAILED',
}

// TYPES

export type TGetEConnectsRequest = {
  type: EGetEConnectsAction.GET_E_CONNECTS_REQUEST;
  payload: {
    materials: TGetEConnectsMaterials;
    successCallback?: (response: TGetEConnectsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetEConnectsSuccess = {
  type: EGetEConnectsAction.GET_E_CONNECTS_SUCCESS;
  payload: { response: TGetEConnectsResponse };
};

export type TGetEConnectsFailed = { type: EGetEConnectsAction.GET_E_CONNECTS_FAILED };

// FUNCTION

export const getEConnectsAction = {
  request: createActionCreator(
    EGetEConnectsAction.GET_E_CONNECTS_REQUEST,
    (resolve) =>
      (
        materials: TGetEConnectsMaterials,
        successCallback?: (response: TGetEConnectsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetEConnectsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetEConnectsAction.GET_E_CONNECTS_SUCCESS,
    (resolve) =>
      (response: TGetEConnectsResponse): TGetEConnectsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetEConnectsAction.GET_E_CONNECTS_FAILED,
    (resolve) =>
      (error: unknown): TGetEConnectsFailed =>
        resolve({ error }),
  ),
};
