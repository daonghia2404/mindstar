import { TUserState } from '@/redux/reducers/user';
import { TResetPasswordSuccess } from '@/redux/actions/user';

export const resetPasswordUpdateState = (state: TUserState, action: TResetPasswordSuccess): TUserState => ({
  ...state,
  resetPasswordResponse: action.payload.response,
});
