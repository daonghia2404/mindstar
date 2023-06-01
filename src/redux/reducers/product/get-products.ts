import { TProductState } from '@/redux/reducers/product';
import { TGetProductsSuccess } from '@/redux/actions/product';

export const getProductsUpdateState = (state: TProductState, action: TGetProductsSuccess): TProductState => ({
  ...state,
  getProductsResponse: action.payload.response,
});
