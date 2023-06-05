import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { changePlayersBranchAction } from '@/redux/actions';
import { changePlayersBranch, TChangePlayersBranchResponse } from '@/services/api';

// FUNCTION

export function* changePlayersBranchSaga(action: ActionType<typeof changePlayersBranchAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(changePlayersBranch, materials);
    const changePlayersBranchResponse: TChangePlayersBranchResponse = response as TChangePlayersBranchResponse;
    yield put(changePlayersBranchAction.success(changePlayersBranchResponse));
    successCallback?.(changePlayersBranchResponse);
  } catch (err) {
    yield put(changePlayersBranchAction.failure(err));
    failedCallback?.(err);
  }
}
