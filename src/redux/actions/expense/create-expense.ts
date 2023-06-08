import { createActionCreator } from 'deox';

import { TCreateExpenseMaterials, TCreateExpenseResponse } from '@/services/api/expense/create-expense';

// CONSTANTS

export enum ECreateExpenseAction {
  CREATE_EXPENSE = 'CREATE_EXPENSE',
  CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST',
  CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS',
  CREATE_EXPENSE_FAILED = 'CREATE_EXPENSE_FAILED',
}

// TYPES

export type TCreateExpenseRequest = {
  type: ECreateExpenseAction.CREATE_EXPENSE_REQUEST;
  payload: {
    materials: TCreateExpenseMaterials;
    successCallback?: (response: TCreateExpenseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateExpenseSuccess = {
  type: ECreateExpenseAction.CREATE_EXPENSE_SUCCESS;
  payload: { response: TCreateExpenseResponse };
};

export type TCreateExpenseFailed = { type: ECreateExpenseAction.CREATE_EXPENSE_FAILED };

// FUNCTION

export const createExpenseAction = {
  request: createActionCreator(
    ECreateExpenseAction.CREATE_EXPENSE_REQUEST,
    (resolve) =>
      (
        materials: TCreateExpenseMaterials,
        successCallback?: (response: TCreateExpenseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateExpenseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateExpenseAction.CREATE_EXPENSE_SUCCESS,
    (resolve) =>
      (response: TCreateExpenseResponse): TCreateExpenseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateExpenseAction.CREATE_EXPENSE_FAILED,
    (resolve) =>
      (error: unknown): TCreateExpenseFailed =>
        resolve({ error }),
  ),
};
