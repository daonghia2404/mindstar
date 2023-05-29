import { createActionCreator } from 'deox';

import { TResetPasswordMaterials, TResetPasswordResponse } from '@/services/api/user/reset-password';

// CONSTANTS

export enum EResetPasswordAction {
  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED',
}

// TYPES

export type TResetPasswordRequest = {
  type: EResetPasswordAction.RESET_PASSWORD_REQUEST;
  payload: {
    materials: TResetPasswordMaterials;
    successCallback?: (response: TResetPasswordResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TResetPasswordSuccess = {
  type: EResetPasswordAction.RESET_PASSWORD_SUCCESS;
  payload: { response: TResetPasswordResponse };
};

export type TResetPasswordFailed = { type: EResetPasswordAction.RESET_PASSWORD_FAILED };

// FUNCTION

export const resetPasswordAction = {
  request: createActionCreator(
    EResetPasswordAction.RESET_PASSWORD_REQUEST,
    (resolve) =>
      (
        materials: TResetPasswordMaterials,
        successCallback?: (response: TResetPasswordResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TResetPasswordRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EResetPasswordAction.RESET_PASSWORD_SUCCESS,
    (resolve) =>
      (response: TResetPasswordResponse): TResetPasswordSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EResetPasswordAction.RESET_PASSWORD_FAILED,
    (resolve) =>
      (error: unknown): TResetPasswordFailed =>
        resolve({ error }),
  ),
};
