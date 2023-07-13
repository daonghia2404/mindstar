import { createActionCreator } from 'deox';

import {
  TGetReportInventoriesMaterials,
  TGetReportInventoriesResponse,
} from '@/services/api/report/get-report-inventories';

// CONSTANTS

export enum EGetReportInventoriesAction {
  GET_REPORT_INVENTORIES = 'GET_REPORT_INVENTORIES',
  GET_REPORT_INVENTORIES_REQUEST = 'GET_REPORT_INVENTORIES_REQUEST',
  GET_REPORT_INVENTORIES_SUCCESS = 'GET_REPORT_INVENTORIES_SUCCESS',
  GET_REPORT_INVENTORIES_FAILED = 'GET_REPORT_INVENTORIES_FAILED',
}

// TYPES

export type TGetReportInventoriesRequest = {
  type: EGetReportInventoriesAction.GET_REPORT_INVENTORIES_REQUEST;
  payload: {
    materials: TGetReportInventoriesMaterials;
    successCallback?: (response: TGetReportInventoriesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetReportInventoriesSuccess = {
  type: EGetReportInventoriesAction.GET_REPORT_INVENTORIES_SUCCESS;
  payload: { response: TGetReportInventoriesResponse };
};

export type TGetReportInventoriesFailed = { type: EGetReportInventoriesAction.GET_REPORT_INVENTORIES_FAILED };

// FUNCTION

export const getReportInventoriesAction = {
  request: createActionCreator(
    EGetReportInventoriesAction.GET_REPORT_INVENTORIES_REQUEST,
    (resolve) =>
      (
        materials: TGetReportInventoriesMaterials,
        successCallback?: (response: TGetReportInventoriesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetReportInventoriesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetReportInventoriesAction.GET_REPORT_INVENTORIES_SUCCESS,
    (resolve) =>
      (response: TGetReportInventoriesResponse): TGetReportInventoriesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetReportInventoriesAction.GET_REPORT_INVENTORIES_FAILED,
    (resolve) =>
      (error: unknown): TGetReportInventoriesFailed =>
        resolve({ error }),
  ),
};
