import { createReducer } from 'deox';

import { TGetMyProfileResponse } from '@/services/api/user';
import { getMyProfileAction } from '@/redux/actions';
import { getMyProfileUpdateState } from './get-my-profile';

export type TUserState = {
  getMyProfileResponse?: TGetMyProfileResponse;
};

const initialState: TUserState = {
  getMyProfileResponse: undefined,
};

const UserReducer = createReducer(initialState, (handleAction) => [
  handleAction(getMyProfileAction.success, getMyProfileUpdateState),
]);

export default UserReducer;
