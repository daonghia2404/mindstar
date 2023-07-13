import { TReportState } from '@/redux/reducers/report';
import { TGetReportAttendancesSuccess } from '@/redux/actions/report';

export const getReportAttendancesUpdateState = (
  state: TReportState,
  action: TGetReportAttendancesSuccess,
): TReportState => ({
  ...state,
  getReportAttendancesResponse: action.payload.response,
});
