import { TReportInventoriesState } from '@/redux/reducers/report-inventories';
import { TGetInventorysSuccess } from '@/redux/actions/report-inventories';

export const getInventorysUpdateState = (
  state: TReportInventoriesState,
  action: TGetInventorysSuccess,
): TReportInventoriesState => ({
  ...state,
  getInventorysResponse: action.payload.response,
});
