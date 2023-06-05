import { all, takeLatest } from 'redux-saga/effects';

import { getMyAcademyAction, updateAcademyAction } from '@/redux/actions';

import { getMyAcademySaga } from './get-my-academy';
import { updateAcademySaga } from './update-academy';

export default function* root(): Generator {
  yield all([
    takeLatest(getMyAcademyAction.request.type, getMyAcademySaga),
    takeLatest(updateAcademyAction.request.type, updateAcademySaga),
  ]);
}
