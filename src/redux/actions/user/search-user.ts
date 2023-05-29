import { createActionCreator } from 'deox';

import { TSearchUserMaterials, TSearchUserResponse } from '@/services/api/user/search-user';

// CONSTANTS

export enum ESearchUserAction {
  SEARCH_USER = 'SEARCH_USER',
  SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST',
  SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS',
  SEARCH_USER_FAILED = 'SEARCH_USER_FAILED',
}

// TYPES

export type TSearchUserRequest = {
  type: ESearchUserAction.SEARCH_USER_REQUEST;
  payload: {
    materials: TSearchUserMaterials;
    successCallback?: (response: TSearchUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TSearchUserSuccess = {
  type: ESearchUserAction.SEARCH_USER_SUCCESS;
  payload: { response: TSearchUserResponse };
};

export type TSearchUserFailed = { type: ESearchUserAction.SEARCH_USER_FAILED };

// FUNCTION

export const searchUserAction = {
  request: createActionCreator(
    ESearchUserAction.SEARCH_USER_REQUEST,
    (resolve) =>
      (
        materials: TSearchUserMaterials,
        successCallback?: (response: TSearchUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TSearchUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ESearchUserAction.SEARCH_USER_SUCCESS,
    (resolve) =>
      (response: TSearchUserResponse): TSearchUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ESearchUserAction.SEARCH_USER_FAILED,
    (resolve) =>
      (error: unknown): TSearchUserFailed =>
        resolve({ error }),
  ),
};
