import { all, takeLatest } from 'redux-saga/effects';

import { getClassesAction } from '@/redux/actions';

import { getClassesSaga } from './get-classes';

export default function* root(): Generator {
  yield all([takeLatest(getClassesAction.request.type, getClassesSaga)]);
}
