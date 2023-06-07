import { createActionCreator } from 'deox';

import { TUpdateExpenseMaterials, TUpdateExpenseResponse } from '@/services/api/expense/update-expense';

// CONSTANTS

export enum EUpdateExpenseAction {
  UPDATE_EXPENSE = 'UPDATE_EXPENSE',
  UPDATE_EXPENSE_REQUEST = 'UPDATE_EXPENSE_REQUEST',
  UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS',
  UPDATE_EXPENSE_FAILED = 'UPDATE_EXPENSE_FAILED',
}

// TYPES

export type TUpdateExpenseRequest = {
  type: EUpdateExpenseAction.UPDATE_EXPENSE_REQUEST;
  payload: {
    materials: TUpdateExpenseMaterials;
    successCallback?: (response: TUpdateExpenseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateExpenseSuccess = {
  type: EUpdateExpenseAction.UPDATE_EXPENSE_SUCCESS;
  payload: { response: TUpdateExpenseResponse };
};

export type TUpdateExpenseFailed = { type: EUpdateExpenseAction.UPDATE_EXPENSE_FAILED };

// FUNCTION

export const updateExpenseAction = {
  request: createActionCreator(
    EUpdateExpenseAction.UPDATE_EXPENSE_REQUEST,
    (resolve) =>
      (
        materials: TUpdateExpenseMaterials,
        successCallback?: (response: TUpdateExpenseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateExpenseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateExpenseAction.UPDATE_EXPENSE_SUCCESS,
    (resolve) =>
      (response: TUpdateExpenseResponse): TUpdateExpenseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateExpenseAction.UPDATE_EXPENSE_FAILED,
    (resolve) =>
      (error: unknown): TUpdateExpenseFailed =>
        resolve({ error }),
  ),
};
