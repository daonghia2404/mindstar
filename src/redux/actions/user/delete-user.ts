import { createActionCreator } from 'deox';

import { TDeleteUserMaterials, TDeleteUserResponse } from '@/services/api/user/delete-user';

// CONSTANTS

export enum EDeleteUserAction {
  DELETE_USER = 'DELETE_USER',
  DELETE_USER_REQUEST = 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILED = 'DELETE_USER_FAILED',
}

// TYPES

export type TDeleteUserRequest = {
  type: EDeleteUserAction.DELETE_USER_REQUEST;
  payload: {
    materials: TDeleteUserMaterials;
    successCallback?: (response: TDeleteUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteUserSuccess = {
  type: EDeleteUserAction.DELETE_USER_SUCCESS;
  payload: { response: TDeleteUserResponse };
};

export type TDeleteUserFailed = { type: EDeleteUserAction.DELETE_USER_FAILED };

// FUNCTION

export const deleteUserAction = {
  request: createActionCreator(
    EDeleteUserAction.DELETE_USER_REQUEST,
    (resolve) =>
      (
        materials: TDeleteUserMaterials,
        successCallback?: (response: TDeleteUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteUserAction.DELETE_USER_SUCCESS,
    (resolve) =>
      (response: TDeleteUserResponse): TDeleteUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteUserAction.DELETE_USER_FAILED,
    (resolve) =>
      (error: unknown): TDeleteUserFailed =>
        resolve({ error }),
  ),
};
