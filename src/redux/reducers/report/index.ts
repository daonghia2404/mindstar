import { createReducer } from 'deox';

import { TGetReportExpensesResponse, TGetReportRevenuesResponse } from '@/services/api/report';
import { getReportExpensesAction, getReportRevenuesAction } from '@/redux/actions';
import { getReportExpensesUpdateState } from './get-report-expenses';
import { getReportRevenuesUpdateState } from './get-report-revenues';

export type TReportState = {
  getReportExpensesResponse?: TGetReportExpensesResponse;
  getReportRevenuesResponse?: TGetReportRevenuesResponse;
};

const initialState: TReportState = {
  getReportExpensesResponse: undefined,
  getReportRevenuesResponse: undefined,
};

const ReportReducer = createReducer(initialState, (handleAction) => [
  handleAction(getReportExpensesAction.success, getReportExpensesUpdateState),
  handleAction(getReportRevenuesAction.success, getReportRevenuesUpdateState),
]);

export default ReportReducer;
