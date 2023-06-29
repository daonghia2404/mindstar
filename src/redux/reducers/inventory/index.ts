import { createReducer } from 'deox';

import {
  TCreateInventoryHistoryExpenseResponse,
  TCreateInventoryHistoryResponse,
  TDeleteInventoryHistoryResponse,
  TGetInventoryHistoriesResponse,
  TUpdateInventoryHistoryResponse,
} from '@/services/api/inventory';
import {
  createInventoryHistoryExpenseAction,
  createInventoryHistoryAction,
  deleteInventoryHistoryAction,
  getInventoryHistoriesAction,
  updateInventoryHistoryAction,
} from '@/redux/actions';
import { createInventoryHistoryExpenseUpdateState } from './create-inventory-history-expense';
import { createInventoryHistoryUpdateState } from './create-inventory-history';
import { deleteInventoryHistoryUpdateState } from './delete-inventory-history';
import { getInventoryHistoriesUpdateState } from './get-inventory-histories';
import { updateInventoryHistoryUpdateState } from './update-inventory-history';

export type TInventoryState = {
  createInventoryHistoryExpenseResponse?: TCreateInventoryHistoryExpenseResponse;
  createInventoryHistoryResponse?: TCreateInventoryHistoryResponse;
  deleteInventoryHistoryResponse?: TDeleteInventoryHistoryResponse;
  getInventoryHistoriesResponse?: TGetInventoryHistoriesResponse;
  updateInventoryHistoryResponse?: TUpdateInventoryHistoryResponse;
};

const initialState: TInventoryState = {
  createInventoryHistoryExpenseResponse: undefined,
  createInventoryHistoryResponse: undefined,
  deleteInventoryHistoryResponse: undefined,
  getInventoryHistoriesResponse: undefined,
  updateInventoryHistoryResponse: undefined,
};

const InventoryReducer = createReducer(initialState, (handleAction) => [
  handleAction(createInventoryHistoryExpenseAction.success, createInventoryHistoryExpenseUpdateState),
  handleAction(createInventoryHistoryAction.success, createInventoryHistoryUpdateState),
  handleAction(deleteInventoryHistoryAction.success, deleteInventoryHistoryUpdateState),
  handleAction(getInventoryHistoriesAction.success, getInventoryHistoriesUpdateState),
  handleAction(updateInventoryHistoryAction.success, updateInventoryHistoryUpdateState),
]);

export default InventoryReducer;
