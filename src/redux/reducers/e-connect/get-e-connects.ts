import { TEConnectState } from '@/redux/reducers/e-connect';
import { TGetEConnectsSuccess } from '@/redux/actions/e-connect';

export const getEConnectsUpdateState = (state: TEConnectState, action: TGetEConnectsSuccess): TEConnectState => ({
  ...state,
  getEConnectsResponse: action.payload.response,
});
