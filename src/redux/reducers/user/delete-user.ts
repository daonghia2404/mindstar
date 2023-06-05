import { TUserState } from '@/redux/reducers/user';
import { TDeleteUserSuccess } from '@/redux/actions/user';

export const deleteUserUpdateState = (state: TUserState, action: TDeleteUserSuccess): TUserState => ({
  ...state,
  deleteUserResponse: action.payload.response,
});
