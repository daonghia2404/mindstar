import { createReducer } from 'deox';

import { TGetSettingsResponse, TUpdateSettingsResponse } from '@/services/api/setting';
import { getSettingsAction, updateSettingsAction } from '@/redux/actions';
import { getSettingsUpdateState } from './get-settings';
import { updateSettingsUpdateState } from './update-settings';

export type TSettingState = {
  getSettingsResponse?: TGetSettingsResponse;
  updateSettingsResponse?: TUpdateSettingsResponse;
};

const initialState: TSettingState = {
  getSettingsResponse: undefined,
  updateSettingsResponse: undefined,
};

const SettingReducer = createReducer(initialState, (handleAction) => [
  handleAction(getSettingsAction.success, getSettingsUpdateState),
  handleAction(updateSettingsAction.success, updateSettingsUpdateState),
]);

export default SettingReducer;
