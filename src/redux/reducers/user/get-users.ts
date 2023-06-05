import { TUserState } from '@/redux/reducers/user';
import { TGetUsersSuccess } from '@/redux/actions/user';

export const getUsersUpdateState = (state: TUserState, action: TGetUsersSuccess): TUserState => ({
  ...state,
  getUsersResponse: action.payload.response,
});
