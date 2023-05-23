import { all, takeLatest } from 'redux-saga/effects';

import { getSchedulesAction } from '@/redux/actions';

import { getSchedulesSaga } from './get-schedules';

export default function* root(): Generator {
  yield all([takeLatest(getSchedulesAction.request.type, getSchedulesSaga)]);
}
