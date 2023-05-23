import { all, takeLatest } from 'redux-saga/effects';

import { getMyProfileAction } from '@/redux/actions';

import { getMyProfileSaga } from './get-my-profile';

export default function* root(): Generator {
  yield all([takeLatest(getMyProfileAction.request.type, getMyProfileSaga)]);
}
