import { createActionCreator } from 'deox';

import {
  TCreateInventoryHistoryExpenseMaterials,
  TCreateInventoryHistoryExpenseResponse,
} from '@/services/api/inventory/create-inventory-history-expense';

// CONSTANTS

export enum ECreateInventoryHistoryExpenseAction {
  CREATE_INVENTORY_HISTORY_EXPENSE = 'CREATE_INVENTORY_HISTORY_EXPENSE',
  CREATE_INVENTORY_HISTORY_EXPENSE_REQUEST = 'CREATE_INVENTORY_HISTORY_EXPENSE_REQUEST',
  CREATE_INVENTORY_HISTORY_EXPENSE_SUCCESS = 'CREATE_INVENTORY_HISTORY_EXPENSE_SUCCESS',
  CREATE_INVENTORY_HISTORY_EXPENSE_FAILED = 'CREATE_INVENTORY_HISTORY_EXPENSE_FAILED',
}

// TYPES

export type TCreateInventoryHistoryExpenseRequest = {
  type: ECreateInventoryHistoryExpenseAction.CREATE_INVENTORY_HISTORY_EXPENSE_REQUEST;
  payload: {
    materials: TCreateInventoryHistoryExpenseMaterials;
    successCallback?: (response: TCreateInventoryHistoryExpenseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateInventoryHistoryExpenseSuccess = {
  type: ECreateInventoryHistoryExpenseAction.CREATE_INVENTORY_HISTORY_EXPENSE_SUCCESS;
  payload: { response: TCreateInventoryHistoryExpenseResponse };
};

export type TCreateInventoryHistoryExpenseFailed = {
  type: ECreateInventoryHistoryExpenseAction.CREATE_INVENTORY_HISTORY_EXPENSE_FAILED;
};

// FUNCTION

export const createInventoryHistoryExpenseAction = {
  request: createActionCreator(
    ECreateInventoryHistoryExpenseAction.CREATE_INVENTORY_HISTORY_EXPENSE_REQUEST,
    (resolve) =>
      (
        materials: TCreateInventoryHistoryExpenseMaterials,
        successCallback?: (response: TCreateInventoryHistoryExpenseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateInventoryHistoryExpenseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateInventoryHistoryExpenseAction.CREATE_INVENTORY_HISTORY_EXPENSE_SUCCESS,
    (resolve) =>
      (response: TCreateInventoryHistoryExpenseResponse): TCreateInventoryHistoryExpenseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateInventoryHistoryExpenseAction.CREATE_INVENTORY_HISTORY_EXPENSE_FAILED,
    (resolve) =>
      (error: unknown): TCreateInventoryHistoryExpenseFailed =>
        resolve({ error }),
  ),
};
