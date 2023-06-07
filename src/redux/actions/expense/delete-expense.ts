import { createActionCreator } from 'deox';

import { TDeleteExpenseMaterials, TDeleteExpenseResponse } from '@/services/api/expense/delete-expense';

// CONSTANTS

export enum EDeleteExpenseAction {
  DELETE_EXPENSE = 'DELETE_EXPENSE',
  DELETE_EXPENSE_REQUEST = 'DELETE_EXPENSE_REQUEST',
  DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS',
  DELETE_EXPENSE_FAILED = 'DELETE_EXPENSE_FAILED',
}

// TYPES

export type TDeleteExpenseRequest = {
  type: EDeleteExpenseAction.DELETE_EXPENSE_REQUEST;
  payload: {
    materials: TDeleteExpenseMaterials;
    successCallback?: (response: TDeleteExpenseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteExpenseSuccess = {
  type: EDeleteExpenseAction.DELETE_EXPENSE_SUCCESS;
  payload: { response: TDeleteExpenseResponse };
};

export type TDeleteExpenseFailed = { type: EDeleteExpenseAction.DELETE_EXPENSE_FAILED };

// FUNCTION

export const deleteExpenseAction = {
  request: createActionCreator(
    EDeleteExpenseAction.DELETE_EXPENSE_REQUEST,
    (resolve) =>
      (
        materials: TDeleteExpenseMaterials,
        successCallback?: (response: TDeleteExpenseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteExpenseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteExpenseAction.DELETE_EXPENSE_SUCCESS,
    (resolve) =>
      (response: TDeleteExpenseResponse): TDeleteExpenseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteExpenseAction.DELETE_EXPENSE_FAILED,
    (resolve) =>
      (error: unknown): TDeleteExpenseFailed =>
        resolve({ error }),
  ),
};
