import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateAcademyAction } from '@/redux/actions';
import { updateAcademy, TUpdateAcademyResponse } from '@/services/api';

// FUNCTION

export function* updateAcademySaga(action: ActionType<typeof updateAcademyAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateAcademy, materials);
    const updateAcademyResponse: TUpdateAcademyResponse = response as TUpdateAcademyResponse;
    yield put(updateAcademyAction.success(updateAcademyResponse));
    successCallback?.(updateAcademyResponse);
  } catch (err) {
    yield put(updateAcademyAction.failure(err));
    failedCallback?.(err);
  }
}
