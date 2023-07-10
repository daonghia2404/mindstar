import { createActionCreator } from 'deox';

import {
  TGetReportAttendancesMaterials,
  TGetReportAttendancesResponse,
} from '@/services/api/report/get-report-attendances';

// CONSTANTS

export enum EGetReportAttendancesAction {
  GET_REPORT_ATTENDANCES = 'GET_REPORT_ATTENDANCES',
  GET_REPORT_ATTENDANCES_REQUEST = 'GET_REPORT_ATTENDANCES_REQUEST',
  GET_REPORT_ATTENDANCES_SUCCESS = 'GET_REPORT_ATTENDANCES_SUCCESS',
  GET_REPORT_ATTENDANCES_FAILED = 'GET_REPORT_ATTENDANCES_FAILED',
}

// TYPES

export type TGetReportAttendancesRequest = {
  type: EGetReportAttendancesAction.GET_REPORT_ATTENDANCES_REQUEST;
  payload: {
    materials: TGetReportAttendancesMaterials;
    successCallback?: (response: TGetReportAttendancesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetReportAttendancesSuccess = {
  type: EGetReportAttendancesAction.GET_REPORT_ATTENDANCES_SUCCESS;
  payload: { response: TGetReportAttendancesResponse };
};

export type TGetReportAttendancesFailed = { type: EGetReportAttendancesAction.GET_REPORT_ATTENDANCES_FAILED };

// FUNCTION

export const getReportAttendancesAction = {
  request: createActionCreator(
    EGetReportAttendancesAction.GET_REPORT_ATTENDANCES_REQUEST,
    (resolve) =>
      (
        materials: TGetReportAttendancesMaterials,
        successCallback?: (response: TGetReportAttendancesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetReportAttendancesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetReportAttendancesAction.GET_REPORT_ATTENDANCES_SUCCESS,
    (resolve) =>
      (response: TGetReportAttendancesResponse): TGetReportAttendancesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetReportAttendancesAction.GET_REPORT_ATTENDANCES_FAILED,
    (resolve) =>
      (error: unknown): TGetReportAttendancesFailed =>
        resolve({ error }),
  ),
};
