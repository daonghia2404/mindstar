import { createReducer } from 'deox';

import { TGetInventorysResponse } from '@/services/api/report-inventories';
import { getInventorysAction } from '@/redux/actions';
import { getInventorysUpdateState } from './get-inventorys';

export type TReportInventoriesState = {
  getInventorysResponse?: TGetInventorysResponse;
};

const initialState: TReportInventoriesState = {
  getInventorysResponse: undefined,
};

const ReportInventoriesReducer = createReducer(initialState, (handleAction) => [
  handleAction(getInventorysAction.success, getInventorysUpdateState),
]);

export default ReportInventoriesReducer;
