import { createActionCreator } from 'deox';

import {
  TCreateInventoryHistoryMaterials,
  TCreateInventoryHistoryResponse,
} from '@/services/api/inventory/create-inventory-history';

// CONSTANTS

export enum ECreateInventoryHistoryAction {
  CREATE_INVENTORY_HISTORY = 'CREATE_INVENTORY_HISTORY',
  CREATE_INVENTORY_HISTORY_REQUEST = 'CREATE_INVENTORY_HISTORY_REQUEST',
  CREATE_INVENTORY_HISTORY_SUCCESS = 'CREATE_INVENTORY_HISTORY_SUCCESS',
  CREATE_INVENTORY_HISTORY_FAILED = 'CREATE_INVENTORY_HISTORY_FAILED',
}

// TYPES

export type TCreateInventoryHistoryRequest = {
  type: ECreateInventoryHistoryAction.CREATE_INVENTORY_HISTORY_REQUEST;
  payload: {
    materials: TCreateInventoryHistoryMaterials;
    successCallback?: (response: TCreateInventoryHistoryResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateInventoryHistorySuccess = {
  type: ECreateInventoryHistoryAction.CREATE_INVENTORY_HISTORY_SUCCESS;
  payload: { response: TCreateInventoryHistoryResponse };
};

export type TCreateInventoryHistoryFailed = { type: ECreateInventoryHistoryAction.CREATE_INVENTORY_HISTORY_FAILED };

// FUNCTION

export const createInventoryHistoryAction = {
  request: createActionCreator(
    ECreateInventoryHistoryAction.CREATE_INVENTORY_HISTORY_REQUEST,
    (resolve) =>
      (
        materials: TCreateInventoryHistoryMaterials,
        successCallback?: (response: TCreateInventoryHistoryResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateInventoryHistoryRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateInventoryHistoryAction.CREATE_INVENTORY_HISTORY_SUCCESS,
    (resolve) =>
      (response: TCreateInventoryHistoryResponse): TCreateInventoryHistorySuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateInventoryHistoryAction.CREATE_INVENTORY_HISTORY_FAILED,
    (resolve) =>
      (error: unknown): TCreateInventoryHistoryFailed =>
        resolve({ error }),
  ),
};
