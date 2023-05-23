import { createActionCreator } from 'deox';

import { TLoginMaterials, TLoginResponse } from '@/services/api/auth/login';

// CONSTANTS

export enum ELoginAction {
  LOGIN = 'LOGIN',
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
}

// TYPES

export type TLoginRequest = {
  type: ELoginAction.LOGIN_REQUEST;
  payload: {
    materials: TLoginMaterials;
    successCallback?: (response: TLoginResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TLoginSuccess = {
  type: ELoginAction.LOGIN_SUCCESS;
  payload: { response: TLoginResponse };
};

export type TLoginFailed = { type: ELoginAction.LOGIN_FAILED };

// FUNCTION

export const loginAction = {
  request: createActionCreator(
    ELoginAction.LOGIN_REQUEST,
    (resolve) =>
      (
        materials: TLoginMaterials,
        successCallback?: (response: TLoginResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TLoginRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ELoginAction.LOGIN_SUCCESS,
    (resolve) =>
      (response: TLoginResponse): TLoginSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ELoginAction.LOGIN_FAILED,
    (resolve) =>
      (error: unknown): TLoginFailed =>
        resolve({ error }),
  ),
};
