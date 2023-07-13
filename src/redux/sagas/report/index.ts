import { all, takeLatest } from 'redux-saga/effects';

import {
  getReportAttendancesAction,
  getReportExpensesAction,
  getReportInventoriesAction,
  getReportRevenuesAction,
} from '@/redux/actions';

import { getReportAttendancesSaga } from './get-report-attendances';
import { getReportExpensesSaga } from './get-report-expenses';
import { getReportInventoriesSaga } from './get-report-inventories';
import { getReportRevenuesSaga } from './get-report-revenues';

export default function* root(): Generator {
  yield all([
    takeLatest(getReportAttendancesAction.request.type, getReportAttendancesSaga),
    takeLatest(getReportExpensesAction.request.type, getReportExpensesSaga),
    takeLatest(getReportInventoriesAction.request.type, getReportInventoriesSaga),
    takeLatest(getReportRevenuesAction.request.type, getReportRevenuesSaga),
  ]);
}
