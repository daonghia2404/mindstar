import { TProductState } from '@/redux/reducers/product';
import { TCreateProductSuccess } from '@/redux/actions/product';

export const createProductUpdateState = (state: TProductState, action: TCreateProductSuccess): TProductState => ({
  ...state,
  createProductResponse: action.payload.response,
});
