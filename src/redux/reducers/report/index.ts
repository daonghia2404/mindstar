import { createReducer } from 'deox';

import {
  TGetReportAttendancesResponse,
  TGetReportExpensesResponse,
  TGetReportInventoriesResponse,
  TGetReportRevenuesResponse,
} from '@/services/api/report';
import {
  getReportAttendancesAction,
  getReportExpensesAction,
  getReportInventoriesAction,
  getReportRevenuesAction,
} from '@/redux/actions';
import { getReportAttendancesUpdateState } from './get-report-attendances';
import { getReportExpensesUpdateState } from './get-report-expenses';
import { getReportInventoriesUpdateState } from './get-report-inventories';
import { getReportRevenuesUpdateState } from './get-report-revenues';

export type TReportState = {
  getReportAttendancesResponse?: TGetReportAttendancesResponse;
  getReportExpensesResponse?: TGetReportExpensesResponse;
  getReportInventoriesResponse?: TGetReportInventoriesResponse;
  getReportRevenuesResponse?: TGetReportRevenuesResponse;
};

const initialState: TReportState = {
  getReportAttendancesResponse: undefined,
  getReportExpensesResponse: undefined,
  getReportInventoriesResponse: undefined,
  getReportRevenuesResponse: undefined,
};

const ReportReducer = createReducer(initialState, (handleAction) => [
  handleAction(getReportAttendancesAction.success, getReportAttendancesUpdateState),
  handleAction(getReportExpensesAction.success, getReportExpensesUpdateState),
  handleAction(getReportInventoriesAction.success, getReportInventoriesUpdateState),
  handleAction(getReportRevenuesAction.success, getReportRevenuesUpdateState),
]);

export default ReportReducer;
