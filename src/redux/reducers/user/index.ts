import { createReducer } from 'deox';

import {
  TChangePlayersBranchResponse,
  TGetChildPlayersResponse,
  TGetMyProfileResponse,
  TResetPasswordResponse,
  TSearchUserResponse,
} from '@/services/api/user';
import {
  changePlayersBranchAction,
  getChildPlayersAction,
  getMyProfileAction,
  resetPasswordAction,
  searchUserAction,
} from '@/redux/actions';
import { changePlayersBranchUpdateState } from './change-players-branch';
import { getChildPlayersUpdateState } from './get-child-players';
import { getMyProfileUpdateState } from './get-my-profile';
import { resetPasswordUpdateState } from './reset-password';
import { searchUserUpdateState } from './search-user';

export type TUserState = {
  changePlayersBranchResponse?: TChangePlayersBranchResponse;
  getChildPlayersResponse?: TGetChildPlayersResponse;
  getMyProfileResponse?: TGetMyProfileResponse;
  resetPasswordResponse?: TResetPasswordResponse;
  searchUserResponse?: TSearchUserResponse;
};

const initialState: TUserState = {
  changePlayersBranchResponse: undefined,
  getChildPlayersResponse: undefined,
  getMyProfileResponse: undefined,
  resetPasswordResponse: undefined,
  searchUserResponse: undefined,
};

const UserReducer = createReducer(initialState, (handleAction) => [
  handleAction(changePlayersBranchAction.success, changePlayersBranchUpdateState),
  handleAction(getChildPlayersAction.success, getChildPlayersUpdateState),
  handleAction(getMyProfileAction.success, getMyProfileUpdateState),
  handleAction(resetPasswordAction.success, resetPasswordUpdateState),
  handleAction(searchUserAction.success, searchUserUpdateState),
]);

export default UserReducer;
