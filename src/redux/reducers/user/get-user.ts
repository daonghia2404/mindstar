import { TUserState } from '@/redux/reducers/user';
import { TGetUserSuccess } from '@/redux/actions/user';

export const getUserUpdateState = (state: TUserState, action: TGetUserSuccess): TUserState => ({
  ...state,
  getUserResponse: action.payload.response,
});
