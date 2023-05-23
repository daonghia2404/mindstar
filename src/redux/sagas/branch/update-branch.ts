import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateBranchAction } from '@/redux/actions';
import { updateBranch, TUpdateBranchResponse } from '@/services/api';

// FUNCTION

export function* updateBranchSaga(action: ActionType<typeof updateBranchAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateBranch, materials);
    const updateBranchResponse: TUpdateBranchResponse = response as TUpdateBranchResponse;
    yield put(updateBranchAction.success(updateBranchResponse));
    successCallback?.(updateBranchResponse);
  } catch (err) {
    yield put(updateBranchAction.failure(err));
    failedCallback?.(err);
  }
}
