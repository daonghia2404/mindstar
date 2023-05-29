import { createReducer } from 'deox';

import { TGetEConnectsResponse } from '@/services/api/e-connect';
import { getEConnectsAction } from '@/redux/actions';
import { getEConnectsUpdateState } from './get-e-connects';

export type TEConnectState = {
  getEConnectsResponse?: TGetEConnectsResponse;
};

const initialState: TEConnectState = {
  getEConnectsResponse: undefined,
};

const EConnectReducer = createReducer(initialState, (handleAction) => [
  handleAction(getEConnectsAction.success, getEConnectsUpdateState),
]);

export default EConnectReducer;
