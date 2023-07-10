import { createReducer } from 'deox';

import {
  TGetReportAttendancesResponse,
  TGetReportExpensesResponse,
  TGetReportRevenuesResponse,
} from '@/services/api/report';
import { getReportAttendancesAction, getReportExpensesAction, getReportRevenuesAction } from '@/redux/actions';
import { getReportAttendancesUpdateState } from './get-report-attendances';
import { getReportExpensesUpdateState } from './get-report-expenses';
import { getReportRevenuesUpdateState } from './get-report-revenues';

export type TReportState = {
  getReportAttendancesResponse?: TGetReportAttendancesResponse;
  getReportExpensesResponse?: TGetReportExpensesResponse;
  getReportRevenuesResponse?: TGetReportRevenuesResponse;
};

const initialState: TReportState = {
  getReportAttendancesResponse: undefined,
  getReportExpensesResponse: undefined,
  getReportRevenuesResponse: undefined,
};

const ReportReducer = createReducer(initialState, (handleAction) => [
  handleAction(getReportAttendancesAction.success, getReportAttendancesUpdateState),
  handleAction(getReportExpensesAction.success, getReportExpensesUpdateState),
  handleAction(getReportRevenuesAction.success, getReportRevenuesUpdateState),
]);

export default ReportReducer;
