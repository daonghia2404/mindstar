import { TReportState } from '@/redux/reducers/report';
import { TGetReportExpensesSuccess } from '@/redux/actions/report';

export const getReportExpensesUpdateState = (state: TReportState, action: TGetReportExpensesSuccess): TReportState => ({
  ...state,
  getReportExpensesResponse: action.payload.response,
});
