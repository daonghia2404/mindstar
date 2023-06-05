import { createReducer } from 'deox';

import {
  TCreateUserResponse,
  TDeleteUserResponse,
  TGetMyProfileResponse,
  TGetUserResponse,
  TGetUsersResponse,
  TResetPasswordResponse,
  TSearchUserResponse,
  TUpdateUserResponse,
} from '@/services/api/user';
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
import { createUserUpdateState } from './create-user';
import { deleteUserUpdateState } from './delete-user';
import { getMyProfileUpdateState } from './get-my-profile';
import { getUserUpdateState } from './get-user';
import { getUsersUpdateState } from './get-users';
import { resetPasswordUpdateState } from './reset-password';
import { searchUserUpdateState } from './search-user';
import { updateUserUpdateState } from './update-user';

export type TUserState = {
  createUserResponse?: TCreateUserResponse;
  deleteUserResponse?: TDeleteUserResponse;
  getMyProfileResponse?: TGetMyProfileResponse;
  getUserResponse?: TGetUserResponse;
  getUsersResponse?: TGetUsersResponse;
  resetPasswordResponse?: TResetPasswordResponse;
  searchUserResponse?: TSearchUserResponse;
  updateUserResponse?: TUpdateUserResponse;
};

const initialState: TUserState = {
  createUserResponse: undefined,
  deleteUserResponse: undefined,
  getMyProfileResponse: undefined,
  getUserResponse: undefined,
  getUsersResponse: undefined,
  resetPasswordResponse: undefined,
  searchUserResponse: undefined,
  updateUserResponse: undefined,
};

const UserReducer = createReducer(initialState, (handleAction) => [
  handleAction(createUserAction.success, createUserUpdateState),
  handleAction(deleteUserAction.success, deleteUserUpdateState),
  handleAction(getMyProfileAction.success, getMyProfileUpdateState),
  handleAction(getUserAction.success, getUserUpdateState),
  handleAction(getUsersAction.success, getUsersUpdateState),
  handleAction(resetPasswordAction.success, resetPasswordUpdateState),
  handleAction(searchUserAction.success, searchUserUpdateState),
  handleAction(updateUserAction.success, updateUserUpdateState),
]);

export default UserReducer;
