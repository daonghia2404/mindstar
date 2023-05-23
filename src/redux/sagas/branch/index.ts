import { all, takeLatest } from 'redux-saga/effects';

import {
  createBranchAction,
  deleteBranchAction,
  getBranchesAction,
  getCommonBranchesAction,
  updateBranchAction,
} from '@/redux/actions';

import { createBranchSaga } from './create-branch';
import { deleteBranchSaga } from './delete-branch';
import { getBranchesSaga } from './get-branches';
import { getCommonBranchesSaga } from './get-common-branches';
import { updateBranchSaga } from './update-branch';

export default function* root(): Generator {
  yield all([
    takeLatest(createBranchAction.request.type, createBranchSaga),
    takeLatest(deleteBranchAction.request.type, deleteBranchSaga),
    takeLatest(getBranchesAction.request.type, getBranchesSaga),
    takeLatest(getCommonBranchesAction.request.type, getCommonBranchesSaga),
    takeLatest(updateBranchAction.request.type, updateBranchSaga),
  ]);
}
