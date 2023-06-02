import { all, takeLatest } from 'redux-saga/effects';

import { deleteRedeemAction, getRedeemsAction, updateRedeemAction } from '@/redux/actions';

import { deleteRedeemSaga } from './delete-redeem';
import { getRedeemsSaga } from './get-redeems';
import { updateRedeemSaga } from './update-redeem';

export default function* root(): Generator {
  yield all([
    takeLatest(deleteRedeemAction.request.type, deleteRedeemSaga),
    takeLatest(getRedeemsAction.request.type, getRedeemsSaga),
    takeLatest(updateRedeemAction.request.type, updateRedeemSaga),
  ]);
}
