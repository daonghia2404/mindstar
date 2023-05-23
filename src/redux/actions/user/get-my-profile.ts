import { createActionCreator } from 'deox';

import { TGetMyProfileMaterials, TGetMyProfileResponse } from '@/services/api/user/get-my-profile';

// CONSTANTS

export enum EGetMyProfileAction {
  GET_MY_PROFILE = 'GET_MY_PROFILE',
  GET_MY_PROFILE_REQUEST = 'GET_MY_PROFILE_REQUEST',
  GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS',
  GET_MY_PROFILE_FAILED = 'GET_MY_PROFILE_FAILED',
}

// TYPES

export type TGetMyProfileRequest = {
  type: EGetMyProfileAction.GET_MY_PROFILE_REQUEST;
  payload: {
    materials: TGetMyProfileMaterials;
    successCallback?: (response: TGetMyProfileResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMyProfileSuccess = {
  type: EGetMyProfileAction.GET_MY_PROFILE_SUCCESS;
  payload: { response: TGetMyProfileResponse };
};

export type TGetMyProfileFailed = { type: EGetMyProfileAction.GET_MY_PROFILE_FAILED };

// FUNCTION

export const getMyProfileAction = {
  request: createActionCreator(
    EGetMyProfileAction.GET_MY_PROFILE_REQUEST,
    (resolve) =>
      (
        materials: TGetMyProfileMaterials,
        successCallback?: (response: TGetMyProfileResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMyProfileRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMyProfileAction.GET_MY_PROFILE_SUCCESS,
    (resolve) =>
      (response: TGetMyProfileResponse): TGetMyProfileSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMyProfileAction.GET_MY_PROFILE_FAILED,
    (resolve) =>
      (error: unknown): TGetMyProfileFailed =>
        resolve({ error }),
  ),
};
