import { all, takeLatest } from 'redux-saga/effects';

import { getSettingsAction, updateSettingsAction } from '@/redux/actions';

import { getSettingsSaga } from './get-settings';
import { updateSettingsSaga } from './update-settings';

export default function* root(): Generator {
  yield all([
    takeLatest(getSettingsAction.request.type, getSettingsSaga),
    takeLatest(updateSettingsAction.request.type, updateSettingsSaga),
  ]);
}
