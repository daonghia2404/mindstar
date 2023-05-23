import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createBranchAction } from '@/redux/actions';
import { createBranch, TCreateBranchResponse } from '@/services/api';

// FUNCTION

export function* createBranchSaga(action: ActionType<typeof createBranchAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createBranch, materials);
    const createBranchResponse: TCreateBranchResponse = response as TCreateBranchResponse;
    yield put(createBranchAction.success(createBranchResponse));
    successCallback?.(createBranchResponse);
  } catch (err) {
    yield put(createBranchAction.failure(err));
    failedCallback?.(err);
  }
}
