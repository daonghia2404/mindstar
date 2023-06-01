import { createReducer } from 'deox';

import {
  TDeleteUploadImagesProductsResponse,
  TUploadAvatarUserResponse,
  TUploadImagesProductResponse,
} from '@/services/api/upload';
import { deleteUploadImagesProductsAction, uploadAvatarUserAction, uploadImagesProductAction } from '@/redux/actions';
import { deleteUploadImagesProductsUpdateState } from './delete-upload-images-products';
import { uploadAvatarUserUpdateState } from './upload-avatar-user';
import { uploadImagesProductUpdateState } from './upload-images-product';

export type TUploadState = {
  deleteUploadImagesProductsResponse?: TDeleteUploadImagesProductsResponse;
  uploadAvatarUserResponse?: TUploadAvatarUserResponse;
  uploadImagesProductResponse?: TUploadImagesProductResponse;
};

const initialState: TUploadState = {
  deleteUploadImagesProductsResponse: undefined,
  uploadAvatarUserResponse: undefined,
  uploadImagesProductResponse: undefined,
};

const UploadReducer = createReducer(initialState, (handleAction) => [
  handleAction(deleteUploadImagesProductsAction.success, deleteUploadImagesProductsUpdateState),
  handleAction(uploadAvatarUserAction.success, uploadAvatarUserUpdateState),
  handleAction(uploadImagesProductAction.success, uploadImagesProductUpdateState),
]);

export default UploadReducer;
