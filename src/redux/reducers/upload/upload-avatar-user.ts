import { TUploadState } from '@/redux/reducers/upload';
import { TUploadAvatarUserSuccess } from '@/redux/actions/upload';

export const uploadAvatarUserUpdateState = (state: TUploadState, action: TUploadAvatarUserSuccess): TUploadState => ({
  ...state,
  uploadAvatarUserResponse: action.payload.response,
});
