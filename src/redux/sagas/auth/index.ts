import { all, takeLatest } from 'redux-saga/effects';

import { loginAction } from '@/redux/actions';

import { loginSaga } from './login';

export default function* root(): Generator {
  yield all([takeLatest(loginAction.request.type, loginSaga)]);
}
