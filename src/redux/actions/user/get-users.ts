import { createActionCreator } from 'deox';

import { TGetUsersMaterials, TGetUsersResponse } from '@/services/api/user/get-users';

// CONSTANTS

export enum EGetUsersAction {
  GET_USERS = 'GET_USERS',
  GET_USERS_REQUEST = 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_FAILED = 'GET_USERS_FAILED',
}

// TYPES

export type TGetUsersRequest = {
  type: EGetUsersAction.GET_USERS_REQUEST;
  payload: {
    materials: TGetUsersMaterials;
    successCallback?: (response: TGetUsersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetUsersSuccess = {
  type: EGetUsersAction.GET_USERS_SUCCESS;
  payload: { response: TGetUsersResponse };
};

export type TGetUsersFailed = { type: EGetUsersAction.GET_USERS_FAILED };

// FUNCTION

export const getUsersAction = {
  request: createActionCreator(
    EGetUsersAction.GET_USERS_REQUEST,
    (resolve) =>
      (
        materials: TGetUsersMaterials,
        successCallback?: (response: TGetUsersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetUsersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetUsersAction.GET_USERS_SUCCESS,
    (resolve) =>
      (response: TGetUsersResponse): TGetUsersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetUsersAction.GET_USERS_FAILED,
    (resolve) =>
      (error: unknown): TGetUsersFailed =>
        resolve({ error }),
  ),
};
