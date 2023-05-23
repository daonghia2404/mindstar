import { createReducer } from 'deox';

import { TGetSettingsResponse } from '@/services/api/setting';
import { getSettingsAction } from '@/redux/actions';
import { getSettingsUpdateState } from './get-settings';

export type TSettingState = {
  getSettingsResponse?: TGetSettingsResponse;
};

const initialState: TSettingState = {
  getSettingsResponse: undefined,
};

const SettingReducer = createReducer(initialState, (handleAction) => [
  handleAction(getSettingsAction.success, getSettingsUpdateState),
]);

export default SettingReducer;
