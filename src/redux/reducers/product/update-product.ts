import { TProductState } from '@/redux/reducers/product';
import { TUpdateProductSuccess } from '@/redux/actions/product';

export const updateProductUpdateState = (state: TProductState, action: TUpdateProductSuccess): TProductState => ({
  ...state,
  updateProductResponse: action.payload.response,
});
