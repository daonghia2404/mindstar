import { createReducer } from 'deox';

import {
  TCreateManagerResponse,
  TDeleteManagerResponse,
  TGetManagersResponse,
  TUpdateManagerResponse,
} from '@/services/api/manager';
import { createManagerAction, deleteManagerAction, getManagersAction, updateManagerAction } from '@/redux/actions';
import { createManagerUpdateState } from './create-manager';
import { deleteManagerUpdateState } from './delete-manager';
import { getManagersUpdateState } from './get-managers';
import { updateManagerUpdateState } from './update-manager';

export type TManagerState = {
  createManagerResponse?: TCreateManagerResponse;
  deleteManagerResponse?: TDeleteManagerResponse;
  getManagersResponse?: TGetManagersResponse;
  updateManagerResponse?: TUpdateManagerResponse;
};

const initialState: TManagerState = {
  createManagerResponse: undefined,
  deleteManagerResponse: undefined,
  getManagersResponse: undefined,
  updateManagerResponse: undefined,
};

const ManagerReducer = createReducer(initialState, (handleAction) => [
  handleAction(createManagerAction.success, createManagerUpdateState),
  handleAction(deleteManagerAction.success, deleteManagerUpdateState),
  handleAction(getManagersAction.success, getManagersUpdateState),
  handleAction(updateManagerAction.success, updateManagerUpdateState),
]);

export default ManagerReducer;
