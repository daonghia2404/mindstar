import { all, takeLatest } from 'redux-saga/effects';

import { uploadAvatarUserAction } from '@/redux/actions';

import { uploadAvatarUserSaga } from './upload-avatar-user';

export default function* root(): Generator {
  yield all([takeLatest(uploadAvatarUserAction.request.type, uploadAvatarUserSaga)]);
}
