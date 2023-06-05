import { TSupplierState } from '@/redux/reducers/supplier';
import { TUpdateSupplierSuccess } from '@/redux/actions/supplier';

export const updateSupplierUpdateState = (state: TSupplierState, action: TUpdateSupplierSuccess): TSupplierState => ({
  ...state,
  updateSupplierResponse: action.payload.response,
});
