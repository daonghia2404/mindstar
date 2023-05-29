import { TUserState } from '@/redux/reducers/user';
import { TSearchUserSuccess } from '@/redux/actions/user';

export const searchUserUpdateState = (state: TUserState, action: TSearchUserSuccess): TUserState => ({
  ...state,
  searchUserResponse: action.payload.response,
});
