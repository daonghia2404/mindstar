import { TProductState } from '@/redux/reducers/product';
import { TGetProductSuccess } from '@/redux/actions/product';

export const getProductUpdateState = (state: TProductState, action: TGetProductSuccess): TProductState => ({
  ...state,
  getProductResponse: action.payload.response,
});
