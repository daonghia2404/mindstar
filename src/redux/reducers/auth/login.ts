import { TAuthState } from '@/redux/reducers/auth';
import { TLoginSuccess } from '@/redux/actions/auth';

export const loginUpdateState = (state: TAuthState, action: TLoginSuccess): TAuthState => ({
  ...state,
  loginResponse: action.payload.response,
});
