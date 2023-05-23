import { all, takeLatest } from 'redux-saga/effects';

import { getDashboardAction } from '@/redux/actions';

import { getDashboardSaga } from './get-dashboard';

export default function* root(): Generator {
  yield all([takeLatest(getDashboardAction.request.type, getDashboardSaga)]);
}
