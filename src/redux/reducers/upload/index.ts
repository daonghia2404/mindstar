import { createReducer } from 'deox';

import { TUploadAvatarUserResponse } from '@/services/api/upload';
import { uploadAvatarUserAction } from '@/redux/actions';
import { uploadAvatarUserUpdateState } from './upload-avatar-user';

export type TUploadState = {
  uploadAvatarUserResponse?: TUploadAvatarUserResponse;
};

const initialState: TUploadState = {
  uploadAvatarUserResponse: undefined,
};

const UploadReducer = createReducer(initialState, (handleAction) => [
  handleAction(uploadAvatarUserAction.success, uploadAvatarUserUpdateState),
]);

export default UploadReducer;
