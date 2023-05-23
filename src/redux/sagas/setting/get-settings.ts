import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getSettingsAction } from '@/redux/actions';
import { getSettings, TGetSettingsResponse } from '@/services/api';

// FUNCTION

export function* getSettingsSaga(action: ActionType<typeof getSettingsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getSettings, materials);
    const getSettingsResponse: TGetSettingsResponse = response as TGetSettingsResponse;
    yield put(getSettingsAction.success(getSettingsResponse));
    successCallback?.(getSettingsResponse);
  } catch (err) {
    yield put(getSettingsAction.failure(err));
    failedCallback?.(err);
  }
}
