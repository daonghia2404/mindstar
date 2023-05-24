import { createReducer } from 'deox';

import {
  TCreateManagerResponse,
  TDeleteManagerResponse,
  TGetManagerResponse,
  TGetManagersResponse,
  TUpdateManagerResponse,
} from '@/services/api/manager';
import {
  createManagerAction,
  deleteManagerAction,
  getManagerAction,
  getManagersAction,
  updateManagerAction,
} from '@/redux/actions';
import { createManagerUpdateState } from './create-manager';
import { deleteManagerUpdateState } from './delete-manager';
import { getManagerUpdateState } from './get-manager';
import { getManagersUpdateState } from './get-managers';
import { updateManagerUpdateState } from './update-manager';

export type TManagerState = {
  createManagerResponse?: TCreateManagerResponse;
  deleteManagerResponse?: TDeleteManagerResponse;
  getManagerResponse?: TGetManagerResponse;
  getManagersResponse?: TGetManagersResponse;
  updateManagerResponse?: TUpdateManagerResponse;
};

const initialState: TManagerState = {
  createManagerResponse: undefined,
  deleteManagerResponse: undefined,
  getManagerResponse: undefined,
  getManagersResponse: undefined,
  updateManagerResponse: undefined,
};

const ManagerReducer = createReducer(initialState, (handleAction) => [
  handleAction(createManagerAction.success, createManagerUpdateState),
  handleAction(deleteManagerAction.success, deleteManagerUpdateState),
  handleAction(getManagerAction.success, getManagerUpdateState),
  handleAction(getManagersAction.success, getManagersUpdateState),
  handleAction(updateManagerAction.success, updateManagerUpdateState),
]);

export default ManagerReducer;
