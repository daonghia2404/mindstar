import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getBranchesAction } from '@/redux/actions';
import { getBranches, TGetBranchesResponse } from '@/services/api';

// FUNCTION

export function* getBranchesSaga(action: ActionType<typeof getBranchesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getBranches, materials);
    const getBranchesResponse: TGetBranchesResponse = response as TGetBranchesResponse;
    yield put(getBranchesAction.success(getBranchesResponse));
    successCallback?.(getBranchesResponse);
  } catch (err) {
    yield put(getBranchesAction.failure(err));
    failedCallback?.(err);
  }
}
