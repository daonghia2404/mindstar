import { all, takeLatest } from 'redux-saga/effects';

import { getRedeemsAction } from '@/redux/actions';

import { getRedeemsSaga } from './get-redeems';

export default function* root(): Generator {
  yield all([takeLatest(getRedeemsAction.request.type, getRedeemsSaga)]);
}
