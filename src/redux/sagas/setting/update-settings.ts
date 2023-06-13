import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateSettingsAction } from '@/redux/actions';
import { updateSettings, TUpdateSettingsResponse } from '@/services/api';

// FUNCTION

export function* updateSettingsSaga(action: ActionType<typeof updateSettingsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateSettings, materials);
    const updateSettingsResponse: TUpdateSettingsResponse = response as TUpdateSettingsResponse;
    yield put(updateSettingsAction.success(updateSettingsResponse));
    successCallback?.(updateSettingsResponse);
  } catch (err) {
    yield put(updateSettingsAction.failure(err));
    failedCallback?.(err);
  }
}
