import { createReducer } from 'deox';

import { TDeleteTimeOffResponse, TGetTimeOffsResponse } from '@/services/api/time-off';
import { deleteTimeOffAction, getTimeOffsAction } from '@/redux/actions';
import { deleteTimeOffUpdateState } from './delete-time-off';
import { getTimeOffsUpdateState } from './get-time-offs';

export type TTimeOffState = {
  deleteTimeOffResponse?: TDeleteTimeOffResponse;
  getTimeOffsResponse?: TGetTimeOffsResponse;
};

const initialState: TTimeOffState = {
  deleteTimeOffResponse: undefined,
  getTimeOffsResponse: undefined,
};

const TimeOffReducer = createReducer(initialState, (handleAction) => [
  handleAction(deleteTimeOffAction.success, deleteTimeOffUpdateState),
  handleAction(getTimeOffsAction.success, getTimeOffsUpdateState),
]);

export default TimeOffReducer;
