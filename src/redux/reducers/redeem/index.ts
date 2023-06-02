import { createReducer } from 'deox';

import { TDeleteRedeemResponse, TGetRedeemsResponse, TUpdateRedeemResponse } from '@/services/api/redeem';
import { deleteRedeemAction, getRedeemsAction, updateRedeemAction } from '@/redux/actions';
import { deleteRedeemUpdateState } from './delete-redeem';
import { getRedeemsUpdateState } from './get-redeems';
import { updateRedeemUpdateState } from './update-redeem';

export type TRedeemState = {
  deleteRedeemResponse?: TDeleteRedeemResponse;
  getRedeemsResponse?: TGetRedeemsResponse;
  updateRedeemResponse?: TUpdateRedeemResponse;
};

const initialState: TRedeemState = {
  deleteRedeemResponse: undefined,
  getRedeemsResponse: undefined,
  updateRedeemResponse: undefined,
};

const RedeemReducer = createReducer(initialState, (handleAction) => [
  handleAction(deleteRedeemAction.success, deleteRedeemUpdateState),
  handleAction(getRedeemsAction.success, getRedeemsUpdateState),
  handleAction(updateRedeemAction.success, updateRedeemUpdateState),
]);

export default RedeemReducer;
