import { TUserState } from '@/redux/reducers/user';
import { TCreateUserSuccess } from '@/redux/actions/user';

export const createUserUpdateState = (state: TUserState, action: TCreateUserSuccess): TUserState => ({
  ...state,
  createUserResponse: action.payload.response,
});
