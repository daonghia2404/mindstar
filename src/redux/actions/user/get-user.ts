import { createActionCreator } from 'deox';

import { TGetUserMaterials, TGetUserResponse } from '@/services/api/user/get-user';

// CONSTANTS

export enum EGetUserAction {
  GET_USER = 'GET_USER',
  GET_USER_REQUEST = 'GET_USER_REQUEST',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  GET_USER_FAILED = 'GET_USER_FAILED',
}

// TYPES

export type TGetUserRequest = {
  type: EGetUserAction.GET_USER_REQUEST;
  payload: {
    materials: TGetUserMaterials;
    successCallback?: (response: TGetUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetUserSuccess = {
  type: EGetUserAction.GET_USER_SUCCESS;
  payload: { response: TGetUserResponse };
};

export type TGetUserFailed = { type: EGetUserAction.GET_USER_FAILED };

// FUNCTION

export const getUserAction = {
  request: createActionCreator(
    EGetUserAction.GET_USER_REQUEST,
    (resolve) =>
      (
        materials: TGetUserMaterials,
        successCallback?: (response: TGetUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetUserAction.GET_USER_SUCCESS,
    (resolve) =>
      (response: TGetUserResponse): TGetUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetUserAction.GET_USER_FAILED,
    (resolve) =>
      (error: unknown): TGetUserFailed =>
        resolve({ error }),
  ),
};
