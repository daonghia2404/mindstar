import { all, takeLatest } from 'redux-saga/effects';

import {
  createClassAction,
  deleteClassAction,
  getClassAction,
  getClassesAction,
  updateClassAction,
} from '@/redux/actions';

import { createClassSaga } from './create-class';
import { deleteClassSaga } from './delete-class';
import { getClassSaga } from './get-class';
import { getClassesSaga } from './get-classes';
import { updateClassSaga } from './update-class';

export default function* root(): Generator {
  yield all([
    takeLatest(createClassAction.request.type, createClassSaga),
    takeLatest(deleteClassAction.request.type, deleteClassSaga),
    takeLatest(getClassAction.request.type, getClassSaga),
    takeLatest(getClassesAction.request.type, getClassesSaga),
    takeLatest(updateClassAction.request.type, updateClassSaga),
  ]);
}
