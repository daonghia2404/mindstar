import { createActionCreator } from 'deox';

import { TCreateUserMaterials, TCreateUserResponse } from '@/services/api/user/create-user';

// CONSTANTS

export enum ECreateUserAction {
  CREATE_USER = 'CREATE_USER',
  CREATE_USER_REQUEST = 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILED = 'CREATE_USER_FAILED',
}

// TYPES

export type TCreateUserRequest = {
  type: ECreateUserAction.CREATE_USER_REQUEST;
  payload: {
    materials: TCreateUserMaterials;
    successCallback?: (response: TCreateUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateUserSuccess = {
  type: ECreateUserAction.CREATE_USER_SUCCESS;
  payload: { response: TCreateUserResponse };
};

export type TCreateUserFailed = { type: ECreateUserAction.CREATE_USER_FAILED };

// FUNCTION

export const createUserAction = {
  request: createActionCreator(
    ECreateUserAction.CREATE_USER_REQUEST,
    (resolve) =>
      (
        materials: TCreateUserMaterials,
        successCallback?: (response: TCreateUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateUserAction.CREATE_USER_SUCCESS,
    (resolve) =>
      (response: TCreateUserResponse): TCreateUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateUserAction.CREATE_USER_FAILED,
    (resolve) =>
      (error: unknown): TCreateUserFailed =>
        resolve({ error }),
  ),
};
