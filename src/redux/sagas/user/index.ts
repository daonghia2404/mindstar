import { all, takeLatest } from 'redux-saga/effects';

import {
  createUserAction,
  deleteUserAction,
  getMyProfileAction,
  getUserAction,
  getUsersAction,
  resetPasswordAction,
  searchUserAction,
  updateUserAction,
} from '@/redux/actions';

import { createUserSaga } from './create-user';
import { deleteUserSaga } from './delete-user';
import { getMyProfileSaga } from './get-my-profile';
import { getUserSaga } from './get-user';
import { getUsersSaga } from './get-users';
import { resetPasswordSaga } from './reset-password';
import { searchUserSaga } from './search-user';
import { updateUserSaga } from './update-user';

export default function* root(): Generator {
  yield all([
    takeLatest(createUserAction.request.type, createUserSaga),
    takeLatest(deleteUserAction.request.type, deleteUserSaga),
    takeLatest(getMyProfileAction.request.type, getMyProfileSaga),
    takeLatest(getUserAction.request.type, getUserSaga),
    takeLatest(getUsersAction.request.type, getUsersSaga),
    takeLatest(resetPasswordAction.request.type, resetPasswordSaga),
    takeLatest(searchUserAction.request.type, searchUserSaga),
    takeLatest(updateUserAction.request.type, updateUserSaga),
  ]);
}
