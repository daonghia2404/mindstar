import { createReducer } from 'deox';

import { TGetRedeemsResponse } from '@/services/api/redeem';
import { getRedeemsAction } from '@/redux/actions';
import { getRedeemsUpdateState } from './get-redeems';

export type TRedeemState = {
  getRedeemsResponse?: TGetRedeemsResponse;
};

const initialState: TRedeemState = {
  getRedeemsResponse: undefined,
};

const RedeemReducer = createReducer(initialState, (handleAction) => [
  handleAction(getRedeemsAction.success, getRedeemsUpdateState),
]);

export default RedeemReducer;
