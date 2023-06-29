import { createActionCreator } from 'deox';

import {
  TDeleteInventoryHistoryMaterials,
  TDeleteInventoryHistoryResponse,
} from '@/services/api/inventory/delete-inventory-history';

// CONSTANTS

export enum EDeleteInventoryHistoryAction {
  DELETE_INVENTORY_HISTORY = 'DELETE_INVENTORY_HISTORY',
  DELETE_INVENTORY_HISTORY_REQUEST = 'DELETE_INVENTORY_HISTORY_REQUEST',
  DELETE_INVENTORY_HISTORY_SUCCESS = 'DELETE_INVENTORY_HISTORY_SUCCESS',
  DELETE_INVENTORY_HISTORY_FAILED = 'DELETE_INVENTORY_HISTORY_FAILED',
}

// TYPES

export type TDeleteInventoryHistoryRequest = {
  type: EDeleteInventoryHistoryAction.DELETE_INVENTORY_HISTORY_REQUEST;
  payload: {
    materials: TDeleteInventoryHistoryMaterials;
    successCallback?: (response: TDeleteInventoryHistoryResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteInventoryHistorySuccess = {
  type: EDeleteInventoryHistoryAction.DELETE_INVENTORY_HISTORY_SUCCESS;
  payload: { response: TDeleteInventoryHistoryResponse };
};

export type TDeleteInventoryHistoryFailed = { type: EDeleteInventoryHistoryAction.DELETE_INVENTORY_HISTORY_FAILED };

// FUNCTION

export const deleteInventoryHistoryAction = {
  request: createActionCreator(
    EDeleteInventoryHistoryAction.DELETE_INVENTORY_HISTORY_REQUEST,
    (resolve) =>
      (
        materials: TDeleteInventoryHistoryMaterials,
        successCallback?: (response: TDeleteInventoryHistoryResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteInventoryHistoryRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteInventoryHistoryAction.DELETE_INVENTORY_HISTORY_SUCCESS,
    (resolve) =>
      (response: TDeleteInventoryHistoryResponse): TDeleteInventoryHistorySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteInventoryHistoryAction.DELETE_INVENTORY_HISTORY_FAILED,
    (resolve) =>
      (error: unknown): TDeleteInventoryHistoryFailed =>
        resolve({ error }),
  ),
};
