import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteRedeemAction } from '@/redux/actions';
import { deleteRedeem, TDeleteRedeemResponse } from '@/services/api';

// FUNCTION

export function* deleteRedeemSaga(action: ActionType<typeof deleteRedeemAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteRedeem, materials);
    const deleteRedeemResponse: TDeleteRedeemResponse = response as TDeleteRedeemResponse;
    yield put(deleteRedeemAction.success(deleteRedeemResponse));
    successCallback?.(deleteRedeemResponse);
  } catch (err) {
    yield put(deleteRedeemAction.failure(err));
    failedCallback?.(err);
  }
}
