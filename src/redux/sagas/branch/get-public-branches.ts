import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPublicBranchesAction } from '@/redux/actions';
import { getPublicBranches, TGetPublicBranchesResponse } from '@/services/api';

// FUNCTION

export function* getPublicBranchesSaga(action: ActionType<typeof getPublicBranchesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPublicBranches, materials);
    const getPublicBranchesResponse: TGetPublicBranchesResponse = response as TGetPublicBranchesResponse;
    yield put(getPublicBranchesAction.success(getPublicBranchesResponse));
    successCallback?.(getPublicBranchesResponse);
  } catch (err) {
    yield put(getPublicBranchesAction.failure(err));
    failedCallback?.(err);
  }
}
