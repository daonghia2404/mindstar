import { all, takeLatest } from 'redux-saga/effects';

import { deleteUploadImagesProductsAction, uploadAvatarUserAction, uploadImagesProductAction } from '@/redux/actions';

import { deleteUploadImagesProductsSaga } from './delete-upload-images-products';
import { uploadAvatarUserSaga } from './upload-avatar-user';
import { uploadImagesProductSaga } from './upload-images-product';

export default function* root(): Generator {
  yield all([
    takeLatest(deleteUploadImagesProductsAction.request.type, deleteUploadImagesProductsSaga),
    takeLatest(uploadAvatarUserAction.request.type, uploadAvatarUserSaga),
    takeLatest(uploadImagesProductAction.request.type, uploadImagesProductSaga),
  ]);
}
