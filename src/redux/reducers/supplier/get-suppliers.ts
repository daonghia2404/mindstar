import { TSupplierState } from '@/redux/reducers/supplier';
import { TGetSuppliersSuccess } from '@/redux/actions/supplier';

export const getSuppliersUpdateState = (state: TSupplierState, action: TGetSuppliersSuccess): TSupplierState => ({
  ...state,
  getSuppliersResponse: action.payload.response,
});
