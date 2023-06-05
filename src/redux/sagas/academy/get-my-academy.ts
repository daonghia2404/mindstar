import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMyAcademyAction } from '@/redux/actions';
import { getMyAcademy, TGetMyAcademyResponse } from '@/services/api';

// FUNCTION

export function* getMyAcademySaga(action: ActionType<typeof getMyAcademyAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMyAcademy, materials);
    const getMyAcademyResponse: TGetMyAcademyResponse = response as TGetMyAcademyResponse;
    yield put(getMyAcademyAction.success(getMyAcademyResponse));
    successCallback?.(getMyAcademyResponse);
  } catch (err) {
    yield put(getMyAcademyAction.failure(err));
    failedCallback?.(err);
  }
}
