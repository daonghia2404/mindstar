import { TSupplierState } from '@/redux/reducers/supplier';
import { TDeleteSupplierSuccess } from '@/redux/actions/supplier';

export const deleteSupplierUpdateState = (state: TSupplierState, action: TDeleteSupplierSuccess): TSupplierState => ({
  ...state,
  deleteSupplierResponse: action.payload.response,
});
