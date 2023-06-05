import { createReducer } from 'deox';

import {
  TCreateSupplierResponse,
  TDeleteSupplierResponse,
  TGetSuppliersResponse,
  TUpdateSupplierResponse,
} from '@/services/api/supplier';
import { createSupplierAction, deleteSupplierAction, getSuppliersAction, updateSupplierAction } from '@/redux/actions';
import { createSupplierUpdateState } from './create-supplier';
import { deleteSupplierUpdateState } from './delete-supplier';
import { getSuppliersUpdateState } from './get-suppliers';
import { updateSupplierUpdateState } from './update-supplier';

export type TSupplierState = {
  createSupplierResponse?: TCreateSupplierResponse;
  deleteSupplierResponse?: TDeleteSupplierResponse;
  getSuppliersResponse?: TGetSuppliersResponse;
  updateSupplierResponse?: TUpdateSupplierResponse;
};

const initialState: TSupplierState = {
  createSupplierResponse: undefined,
  deleteSupplierResponse: undefined,
  getSuppliersResponse: undefined,
  updateSupplierResponse: undefined,
};

const SupplierReducer = createReducer(initialState, (handleAction) => [
  handleAction(createSupplierAction.success, createSupplierUpdateState),
  handleAction(deleteSupplierAction.success, deleteSupplierUpdateState),
  handleAction(getSuppliersAction.success, getSuppliersUpdateState),
  handleAction(updateSupplierAction.success, updateSupplierUpdateState),
]);

export default SupplierReducer;
