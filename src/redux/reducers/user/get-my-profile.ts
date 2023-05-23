import { TUserState } from '@/redux/reducers/user';
import { TGetMyProfileSuccess } from '@/redux/actions/user';

export const getMyProfileUpdateState = (state: TUserState, action: TGetMyProfileSuccess): TUserState => ({
  ...state,
  getMyProfileResponse: action.payload.response,
});
