import { createReducer } from 'deox';

import { TLoginResponse } from '@/services/api/auth';
import { loginAction } from '@/redux/actions';
import { loginUpdateState } from './login';

export type TAuthState = {
  loginResponse?: TLoginResponse;
};

const initialState: TAuthState = {
  loginResponse: undefined,
};

const AuthReducer = createReducer(initialState, (handleAction) => [
  handleAction(loginAction.success, loginUpdateState),
]);

export default AuthReducer;
