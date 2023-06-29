import { createActionCreator } from 'deox';

import {
  TGetInventoryHistoriesMaterials,
  TGetInventoryHistoriesResponse,
} from '@/services/api/inventory/get-inventory-histories';

// CONSTANTS

export enum EGetInventoryHistoriesAction {
  GET_INVENTORY_HISTORIES = 'GET_INVENTORY_HISTORIES',
  GET_INVENTORY_HISTORIES_REQUEST = 'GET_INVENTORY_HISTORIES_REQUEST',
  GET_INVENTORY_HISTORIES_SUCCESS = 'GET_INVENTORY_HISTORIES_SUCCESS',
  GET_INVENTORY_HISTORIES_FAILED = 'GET_INVENTORY_HISTORIES_FAILED',
}

// TYPES

export type TGetInventoryHistoriesRequest = {
  type: EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES_REQUEST;
  payload: {
    materials: TGetInventoryHistoriesMaterials;
    successCallback?: (response: TGetInventoryHistoriesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetInventoryHistoriesSuccess = {
  type: EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES_SUCCESS;
  payload: { response: TGetInventoryHistoriesResponse };
};

export type TGetInventoryHistoriesFailed = { type: EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES_FAILED };

// FUNCTION

export const getInventoryHistoriesAction = {
  request: createActionCreator(
    EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES_REQUEST,
    (resolve) =>
      (
        materials: TGetInventoryHistoriesMaterials,
        successCallback?: (response: TGetInventoryHistoriesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetInventoryHistoriesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES_SUCCESS,
    (resolve) =>
      (response: TGetInventoryHistoriesResponse): TGetInventoryHistoriesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetInventoryHistoriesAction.GET_INVENTORY_HISTORIES_FAILED,
    (resolve) =>
      (error: unknown): TGetInventoryHistoriesFailed =>
        resolve({ error }),
  ),
};
