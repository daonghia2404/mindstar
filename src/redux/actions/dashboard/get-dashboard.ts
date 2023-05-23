import { createActionCreator } from 'deox';

import { TGetDashboardMaterials, TGetDashboardResponse } from '@/services/api/dashboard/get-dashboard';

// CONSTANTS

export enum EGetDashboardAction {
  GET_DASHBOARD = 'GET_DASHBOARD',
  GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST',
  GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS',
  GET_DASHBOARD_FAILED = 'GET_DASHBOARD_FAILED',
}

// TYPES

export type TGetDashboardRequest = {
  type: EGetDashboardAction.GET_DASHBOARD_REQUEST;
  payload: {
    materials: TGetDashboardMaterials;
    successCallback?: (response: TGetDashboardResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetDashboardSuccess = {
  type: EGetDashboardAction.GET_DASHBOARD_SUCCESS;
  payload: { response: TGetDashboardResponse };
};

export type TGetDashboardFailed = { type: EGetDashboardAction.GET_DASHBOARD_FAILED };

// FUNCTION

export const getDashboardAction = {
  request: createActionCreator(
    EGetDashboardAction.GET_DASHBOARD_REQUEST,
    (resolve) =>
      (
        materials: TGetDashboardMaterials,
        successCallback?: (response: TGetDashboardResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetDashboardRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetDashboardAction.GET_DASHBOARD_SUCCESS,
    (resolve) =>
      (response: TGetDashboardResponse): TGetDashboardSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetDashboardAction.GET_DASHBOARD_FAILED,
    (resolve) =>
      (error: unknown): TGetDashboardFailed =>
        resolve({ error }),
  ),
};
