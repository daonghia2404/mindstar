import { createActionCreator } from 'deox';

import { TUploadAvatarUserMaterials, TUploadAvatarUserResponse } from '@/services/api/upload/upload-avatar-user';

// CONSTANTS

export enum EUploadAvatarUserAction {
  UPLOAD_AVATAR_USER = 'UPLOAD_AVATAR_USER',
  UPLOAD_AVATAR_USER_REQUEST = 'UPLOAD_AVATAR_USER_REQUEST',
  UPLOAD_AVATAR_USER_SUCCESS = 'UPLOAD_AVATAR_USER_SUCCESS',
  UPLOAD_AVATAR_USER_FAILED = 'UPLOAD_AVATAR_USER_FAILED',
}

// TYPES

export type TUploadAvatarUserRequest = {
  type: EUploadAvatarUserAction.UPLOAD_AVATAR_USER_REQUEST;
  payload: {
    materials: TUploadAvatarUserMaterials;
    successCallback?: (response: TUploadAvatarUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUploadAvatarUserSuccess = {
  type: EUploadAvatarUserAction.UPLOAD_AVATAR_USER_SUCCESS;
  payload: { response: TUploadAvatarUserResponse };
};

export type TUploadAvatarUserFailed = { type: EUploadAvatarUserAction.UPLOAD_AVATAR_USER_FAILED };

// FUNCTION

export const uploadAvatarUserAction = {
  request: createActionCreator(
    EUploadAvatarUserAction.UPLOAD_AVATAR_USER_REQUEST,
    (resolve) =>
      (
        materials: TUploadAvatarUserMaterials,
        successCallback?: (response: TUploadAvatarUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUploadAvatarUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUploadAvatarUserAction.UPLOAD_AVATAR_USER_SUCCESS,
    (resolve) =>
      (response: TUploadAvatarUserResponse): TUploadAvatarUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUploadAvatarUserAction.UPLOAD_AVATAR_USER_FAILED,
    (resolve) =>
      (error: unknown): TUploadAvatarUserFailed =>
        resolve({ error }),
  ),
};
