import { all, takeLatest } from 'redux-saga/effects';

import { deletePracticeAction, getPracticesAction, updatePracticeAction } from '@/redux/actions';

import { deletePracticeSaga } from './delete-practice';
import { getPracticesSaga } from './get-practices';
import { updatePracticeSaga } from './update-practice';

export default function* root(): Generator {
  yield all([
    takeLatest(deletePracticeAction.request.type, deletePracticeSaga),
    takeLatest(getPracticesAction.request.type, getPracticesSaga),
    takeLatest(updatePracticeAction.request.type, updatePracticeSaga),
  ]);
}
