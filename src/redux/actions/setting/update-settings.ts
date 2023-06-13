import { createActionCreator } from 'deox';

import { TUpdateSettingsMaterials, TUpdateSettingsResponse } from '@/services/api/setting/update-settings';

// CONSTANTS

export enum EUpdateSettingsAction {
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST',
  UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS',
  UPDATE_SETTINGS_FAILED = 'UPDATE_SETTINGS_FAILED',
}

// TYPES

export type TUpdateSettingsRequest = {
  type: EUpdateSettingsAction.UPDATE_SETTINGS_REQUEST;
  payload: {
    materials: TUpdateSettingsMaterials;
    successCallback?: (response: TUpdateSettingsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateSettingsSuccess = {
  type: EUpdateSettingsAction.UPDATE_SETTINGS_SUCCESS;
  payload: { response: TUpdateSettingsResponse };
};

export type TUpdateSettingsFailed = { type: EUpdateSettingsAction.UPDATE_SETTINGS_FAILED };

// FUNCTION

export const updateSettingsAction = {
  request: createActionCreator(
    EUpdateSettingsAction.UPDATE_SETTINGS_REQUEST,
    (resolve) =>
      (
        materials: TUpdateSettingsMaterials,
        successCallback?: (response: TUpdateSettingsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateSettingsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateSettingsAction.UPDATE_SETTINGS_SUCCESS,
    (resolve) =>
      (response: TUpdateSettingsResponse): TUpdateSettingsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateSettingsAction.UPDATE_SETTINGS_FAILED,
    (resolve) =>
      (error: unknown): TUpdateSettingsFailed =>
        resolve({ error }),
  ),
};
