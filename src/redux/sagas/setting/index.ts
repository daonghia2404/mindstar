import { all, takeLatest } from 'redux-saga/effects';

import { getSettingsAction } from '@/redux/actions';

import { getSettingsSaga } from './get-settings';

export default function* root(): Generator {
  yield all([takeLatest(getSettingsAction.request.type, getSettingsSaga)]);
}
