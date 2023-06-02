import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateRedeemAction } from '@/redux/actions';
import { updateRedeem, TUpdateRedeemResponse } from '@/services/api';

// FUNCTION

export function* updateRedeemSaga(action: ActionType<typeof updateRedeemAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateRedeem, materials);
    const updateRedeemResponse: TUpdateRedeemResponse = response as TUpdateRedeemResponse;
    yield put(updateRedeemAction.success(updateRedeemResponse));
    successCallback?.(updateRedeemResponse);
  } catch (err) {
    yield put(updateRedeemAction.failure(err));
    failedCallback?.(err);
  }
}
