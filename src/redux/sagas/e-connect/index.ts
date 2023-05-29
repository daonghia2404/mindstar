import { all, takeLatest } from 'redux-saga/effects';

import { getEConnectsAction } from '@/redux/actions';

import { getEConnectsSaga } from './get-e-connects';

export default function* root(): Generator {
  yield all([takeLatest(getEConnectsAction.request.type, getEConnectsSaga)]);
}
