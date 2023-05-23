import { createActionCreator } from 'deox';

import { TGetSettingsMaterials, TGetSettingsResponse } from '@/services/api/setting/get-settings';

// CONSTANTS

export enum EGetSettingsAction {
  GET_SETTINGS = 'GET_SETTINGS',
  GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST',
  GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS',
  GET_SETTINGS_FAILED = 'GET_SETTINGS_FAILED',
}

// TYPES

export type TGetSettingsRequest = {
  type: EGetSettingsAction.GET_SETTINGS_REQUEST;
  payload: {
    materials: TGetSettingsMaterials;
    successCallback?: (response: TGetSettingsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetSettingsSuccess = {
  type: EGetSettingsAction.GET_SETTINGS_SUCCESS;
  payload: { response: TGetSettingsResponse };
};

export type TGetSettingsFailed = { type: EGetSettingsAction.GET_SETTINGS_FAILED };

// FUNCTION

export const getSettingsAction = {
  request: createActionCreator(
    EGetSettingsAction.GET_SETTINGS_REQUEST,
    (resolve) =>
      (
        materials: TGetSettingsMaterials,
        successCallback?: (response: TGetSettingsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetSettingsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetSettingsAction.GET_SETTINGS_SUCCESS,
    (resolve) =>
      (response: TGetSettingsResponse): TGetSettingsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetSettingsAction.GET_SETTINGS_FAILED,
    (resolve) =>
      (error: unknown): TGetSettingsFailed =>
        resolve({ error }),
  ),
};
