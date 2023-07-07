import { createActionCreator } from 'deox';

import { TGetReportExpensesMaterials, TGetReportExpensesResponse } from '@/services/api/report/get-report-expenses';

// CONSTANTS

export enum EGetReportExpensesAction {
  GET_REPORT_EXPENSES = 'GET_REPORT_EXPENSES',
  GET_REPORT_EXPENSES_REQUEST = 'GET_REPORT_EXPENSES_REQUEST',
  GET_REPORT_EXPENSES_SUCCESS = 'GET_REPORT_EXPENSES_SUCCESS',
  GET_REPORT_EXPENSES_FAILED = 'GET_REPORT_EXPENSES_FAILED',
}

// TYPES

export type TGetReportExpensesRequest = {
  type: EGetReportExpensesAction.GET_REPORT_EXPENSES_REQUEST;
  payload: {
    materials: TGetReportExpensesMaterials;
    successCallback?: (response: TGetReportExpensesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetReportExpensesSuccess = {
  type: EGetReportExpensesAction.GET_REPORT_EXPENSES_SUCCESS;
  payload: { response: TGetReportExpensesResponse };
};

export type TGetReportExpensesFailed = { type: EGetReportExpensesAction.GET_REPORT_EXPENSES_FAILED };

// FUNCTION

export const getReportExpensesAction = {
  request: createActionCreator(
    EGetReportExpensesAction.GET_REPORT_EXPENSES_REQUEST,
    (resolve) =>
      (
        materials: TGetReportExpensesMaterials,
        successCallback?: (response: TGetReportExpensesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetReportExpensesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetReportExpensesAction.GET_REPORT_EXPENSES_SUCCESS,
    (resolve) =>
      (response: TGetReportExpensesResponse): TGetReportExpensesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetReportExpensesAction.GET_REPORT_EXPENSES_FAILED,
    (resolve) =>
      (error: unknown): TGetReportExpensesFailed =>
        resolve({ error }),
  ),
};
