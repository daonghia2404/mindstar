import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getCommonBranchesAction } from '@/redux/actions';
import { getCommonBranches, TGetCommonBranchesResponse } from '@/services/api';

// FUNCTION

export function* getCommonBranchesSaga(action: ActionType<typeof getCommonBranchesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getCommonBranches, materials);
    const getCommonBranchesResponse: TGetCommonBranchesResponse = response as TGetCommonBranchesResponse;
    yield put(getCommonBranchesAction.success(getCommonBranchesResponse));
    successCallback?.(getCommonBranchesResponse);
  } catch (err) {
    yield put(getCommonBranchesAction.failure(err));
    failedCallback?.(err);
  }
}
