import { TSettingState } from '@/redux/reducers/setting';
import { TGetSettingsSuccess } from '@/redux/actions/setting';

export const getSettingsUpdateState = (state: TSettingState, action: TGetSettingsSuccess): TSettingState => ({
  ...state,
  getSettingsResponse: action.payload.response,
});
