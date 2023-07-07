import { all, takeLatest } from 'redux-saga/effects';

import { getReportExpensesAction, getReportRevenuesAction } from '@/redux/actions';

import { getReportExpensesSaga } from './get-report-expenses';
import { getReportRevenuesSaga } from './get-report-revenues';

export default function* root(): Generator {
  yield all([
    takeLatest(getReportExpensesAction.request.type, getReportExpensesSaga),
    takeLatest(getReportRevenuesAction.request.type, getReportRevenuesSaga),
  ]);
}
