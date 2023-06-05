import { TSupplierState } from '@/redux/reducers/supplier';
import { TCreateSupplierSuccess } from '@/redux/actions/supplier';

export const createSupplierUpdateState = (state: TSupplierState, action: TCreateSupplierSuccess): TSupplierState => ({
  ...state,
  createSupplierResponse: action.payload.response,
});
