import { all, takeLatest } from 'redux-saga/effects';

import { createManagerAction, deleteManagerAction, getManagersAction, updateManagerAction } from '@/redux/actions';

import { createManagerSaga } from './create-manager';
import { deleteManagerSaga } from './delete-manager';
import { getManagersSaga } from './get-managers';
import { updateManagerSaga } from './update-manager';

export default function* root(): Generator {
  yield all([
    takeLatest(createManagerAction.request.type, createManagerSaga),
    takeLatest(deleteManagerAction.request.type, deleteManagerSaga),
    takeLatest(getManagersAction.request.type, getManagersSaga),
    takeLatest(updateManagerAction.request.type, updateManagerSaga),
  ]);
}
