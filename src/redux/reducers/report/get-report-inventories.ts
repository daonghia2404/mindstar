import { TReportState } from '@/redux/reducers/report';
import { TGetReportInventoriesSuccess } from '@/redux/actions/report';

export const getReportInventoriesUpdateState = (
  state: TReportState,
  action: TGetReportInventoriesSuccess,
): TReportState => ({
  ...state,
  getReportInventoriesResponse: action.payload.response,
});
