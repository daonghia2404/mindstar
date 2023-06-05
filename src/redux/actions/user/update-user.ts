import { createActionCreator } from 'deox';

import { TUpdateUserMaterials, TUpdateUserResponse } from '@/services/api/user/update-user';

// CONSTANTS

export enum EUpdateUserAction {
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED = 'UPDATE_USER_FAILED',
}

// TYPES

export type TUpdateUserRequest = {
  type: EUpdateUserAction.UPDATE_USER_REQUEST;
  payload: {
    materials: TUpdateUserMaterials;
    successCallback?: (response: TUpdateUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateUserSuccess = {
  type: EUpdateUserAction.UPDATE_USER_SUCCESS;
  payload: { response: TUpdateUserResponse };
};

export type TUpdateUserFailed = { type: EUpdateUserAction.UPDATE_USER_FAILED };

// FUNCTION

export const updateUserAction = {
  request: createActionCreator(
    EUpdateUserAction.UPDATE_USER_REQUEST,
    (resolve) =>
      (
        materials: TUpdateUserMaterials,
        successCallback?: (response: TUpdateUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateUserAction.UPDATE_USER_SUCCESS,
    (resolve) =>
      (response: TUpdateUserResponse): TUpdateUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateUserAction.UPDATE_USER_FAILED,
    (resolve) =>
      (error: unknown): TUpdateUserFailed =>
        resolve({ error }),
  ),
};
