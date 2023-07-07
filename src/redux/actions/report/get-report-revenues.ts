import { createActionCreator } from 'deox';

import { TGetReportRevenuesMaterials, TGetReportRevenuesResponse } from '@/services/api/report/get-report-revenues';

// CONSTANTS

export enum EGetReportRevenuesAction {
  GET_REPORT_REVENUES = 'GET_REPORT_REVENUES',
  GET_REPORT_REVENUES_REQUEST = 'GET_REPORT_REVENUES_REQUEST',
  GET_REPORT_REVENUES_SUCCESS = 'GET_REPORT_REVENUES_SUCCESS',
  GET_REPORT_REVENUES_FAILED = 'GET_REPORT_REVENUES_FAILED',
}

// TYPES

export type TGetReportRevenuesRequest = {
  type: EGetReportRevenuesAction.GET_REPORT_REVENUES_REQUEST;
  payload: {
    materials: TGetReportRevenuesMaterials;
    successCallback?: (response: TGetReportRevenuesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetReportRevenuesSuccess = {
  type: EGetReportRevenuesAction.GET_REPORT_REVENUES_SUCCESS;
  payload: { response: TGetReportRevenuesResponse };
};

export type TGetReportRevenuesFailed = { type: EGetReportRevenuesAction.GET_REPORT_REVENUES_FAILED };

// FUNCTION

export const getReportRevenuesAction = {
  request: createActionCreator(
    EGetReportRevenuesAction.GET_REPORT_REVENUES_REQUEST,
    (resolve) =>
      (
        materials: TGetReportRevenuesMaterials,
        successCallback?: (response: TGetReportRevenuesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetReportRevenuesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetReportRevenuesAction.GET_REPORT_REVENUES_SUCCESS,
    (resolve) =>
      (response: TGetReportRevenuesResponse): TGetReportRevenuesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetReportRevenuesAction.GET_REPORT_REVENUES_FAILED,
    (resolve) =>
      (error: unknown): TGetReportRevenuesFailed =>
        resolve({ error }),
  ),
};
