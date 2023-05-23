import { createActionCreator } from 'deox';

import { TGetExpensesMaterials, TGetExpensesResponse } from '@/services/api/expense/get-expenses';

// CONSTANTS

export enum EGetExpensesAction {
  GET_EXPENSES = 'GET_EXPENSES',
  GET_EXPENSES_REQUEST = 'GET_EXPENSES_REQUEST',
  GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS',
  GET_EXPENSES_FAILED = 'GET_EXPENSES_FAILED',
}

// TYPES

export type TGetExpensesRequest = {
  type: EGetExpensesAction.GET_EXPENSES_REQUEST;
  payload: {
    materials: TGetExpensesMaterials;
    successCallback?: (response: TGetExpensesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetExpensesSuccess = {
  type: EGetExpensesAction.GET_EXPENSES_SUCCESS;
  payload: { response: TGetExpensesResponse };
};

export type TGetExpensesFailed = { type: EGetExpensesAction.GET_EXPENSES_FAILED };

// FUNCTION

export const getExpensesAction = {
  request: createActionCreator(
    EGetExpensesAction.GET_EXPENSES_REQUEST,
    (resolve) =>
      (
        materials: TGetExpensesMaterials,
        successCallback?: (response: TGetExpensesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetExpensesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetExpensesAction.GET_EXPENSES_SUCCESS,
    (resolve) =>
      (response: TGetExpensesResponse): TGetExpensesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetExpensesAction.GET_EXPENSES_FAILED,
    (resolve) =>
      (error: unknown): TGetExpensesFailed =>
        resolve({ error }),
  ),
};
