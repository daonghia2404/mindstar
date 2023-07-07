import { TReportState } from '@/redux/reducers/report';
import { TGetReportRevenuesSuccess } from '@/redux/actions/report';

export const getReportRevenuesUpdateState = (state: TReportState, action: TGetReportRevenuesSuccess): TReportState => ({
  ...state,
  getReportRevenuesResponse: action.payload.response,
});
