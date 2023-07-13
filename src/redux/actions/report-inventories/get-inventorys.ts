import { createActionCreator } from 'deox';

import { TGetInventorysMaterials, TGetInventorysResponse } from '@/services/api/report-inventories/get-inventorys';

// CONSTANTS

export enum EGetInventorysAction {
  GET_INVENTORYS = 'GET_INVENTORYS',
  GET_INVENTORYS_REQUEST = 'GET_INVENTORYS_REQUEST',
  GET_INVENTORYS_SUCCESS = 'GET_INVENTORYS_SUCCESS',
  GET_INVENTORYS_FAILED = 'GET_INVENTORYS_FAILED',
}

// TYPES

export type TGetInventorysRequest = {
  type: EGetInventorysAction.GET_INVENTORYS_REQUEST;
  payload: {
    materials: TGetInventorysMaterials;
    successCallback?: (response: TGetInventorysResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetInventorysSuccess = {
  type: EGetInventorysAction.GET_INVENTORYS_SUCCESS;
  payload: { response: TGetInventorysResponse };
};

export type TGetInventorysFailed = { type: EGetInventorysAction.GET_INVENTORYS_FAILED };

// FUNCTION

export const getInventorysAction = {
  request: createActionCreator(
    EGetInventorysAction.GET_INVENTORYS_REQUEST,
    (resolve) =>
      (
        materials: TGetInventorysMaterials,
        successCallback?: (response: TGetInventorysResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetInventorysRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetInventorysAction.GET_INVENTORYS_SUCCESS,
    (resolve) =>
      (response: TGetInventorysResponse): TGetInventorysSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetInventorysAction.GET_INVENTORYS_FAILED,
    (resolve) =>
      (error: unknown): TGetInventorysFailed =>
        resolve({ error }),
  ),
};
