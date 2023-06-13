import { TSettingState } from '@/redux/reducers/setting';
import { TUpdateSettingsSuccess } from '@/redux/actions/setting';

export const updateSettingsUpdateState = (state: TSettingState, action: TUpdateSettingsSuccess): TSettingState => ({
  ...state,
  updateSettingsResponse: action.payload.response,
});
