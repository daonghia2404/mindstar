import { TUserState } from '@/redux/reducers/user';
import { TUpdateUserSuccess } from '@/redux/actions/user';

export const updateUserUpdateState = (state: TUserState, action: TUpdateUserSuccess): TUserState => ({
  ...state,
  updateUserResponse: action.payload.response,
});
