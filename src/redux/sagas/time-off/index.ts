import { all, takeLatest } from 'redux-saga/effects';

import { deleteTimeOffAction, getTimeOffsAction } from '@/redux/actions';

import { deleteTimeOffSaga } from './delete-time-off';
import { getTimeOffsSaga } from './get-time-offs';

export default function* root(): Generator {
  yield all([
    takeLatest(deleteTimeOffAction.request.type, deleteTimeOffSaga),
    takeLatest(getTimeOffsAction.request.type, getTimeOffsSaga),
  ]);
}
