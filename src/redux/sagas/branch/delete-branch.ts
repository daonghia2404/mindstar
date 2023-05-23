import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteBranchAction } from '@/redux/actions';
import { deleteBranch, TDeleteBranchResponse } from '@/services/api';

// FUNCTION

export function* deleteBranchSaga(action: ActionType<typeof deleteBranchAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteBranch, materials);
    const deleteBranchResponse: TDeleteBranchResponse = response as TDeleteBranchResponse;
    yield put(deleteBranchAction.success(deleteBranchResponse));
    successCallback?.(deleteBranchResponse);
  } catch (err) {
    yield put(deleteBranchAction.failure(err));
    failedCallback?.(err);
  }
}
