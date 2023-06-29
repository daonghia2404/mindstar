import { createActionCreator } from 'deox';

import {
  TUpdateInventoryHistoryMaterials,
  TUpdateInventoryHistoryResponse,
} from '@/services/api/inventory/update-inventory-history';

// CONSTANTS

export enum EUpdateInventoryHistoryAction {
  UPDATE_INVENTORY_HISTORY = 'UPDATE_INVENTORY_HISTORY',
  UPDATE_INVENTORY_HISTORY_REQUEST = 'UPDATE_INVENTORY_HISTORY_REQUEST',
  UPDATE_INVENTORY_HISTORY_SUCCESS = 'UPDATE_INVENTORY_HISTORY_SUCCESS',
  UPDATE_INVENTORY_HISTORY_FAILED = 'UPDATE_INVENTORY_HISTORY_FAILED',
}

// TYPES

export type TUpdateInventoryHistoryRequest = {
  type: EUpdateInventoryHistoryAction.UPDATE_INVENTORY_HISTORY_REQUEST;
  payload: {
    materials: TUpdateInventoryHistoryMaterials;
    successCallback?: (response: TUpdateInventoryHistoryResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateInventoryHistorySuccess = {
  type: EUpdateInventoryHistoryAction.UPDATE_INVENTORY_HISTORY_SUCCESS;
  payload: { response: TUpdateInventoryHistoryResponse };
};

export type TUpdateInventoryHistoryFailed = { type: EUpdateInventoryHistoryAction.UPDATE_INVENTORY_HISTORY_FAILED };

// FUNCTION

export const updateInventoryHistoryAction = {
  request: createActionCreator(
    EUpdateInventoryHistoryAction.UPDATE_INVENTORY_HISTORY_REQUEST,
    (resolve) =>
      (
        materials: TUpdateInventoryHistoryMaterials,
        successCallback?: (response: TUpdateInventoryHistoryResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateInventoryHistoryRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateInventoryHistoryAction.UPDATE_INVENTORY_HISTORY_SUCCESS,
    (resolve) =>
      (response: TUpdateInventoryHistoryResponse): TUpdateInventoryHistorySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateInventoryHistoryAction.UPDATE_INVENTORY_HISTORY_FAILED,
    (resolve) =>
      (error: unknown): TUpdateInventoryHistoryFailed =>
        resolve({ error }),
  ),
};
