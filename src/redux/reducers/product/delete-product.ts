import { TProductState } from '@/redux/reducers/product';
import { TDeleteProductSuccess } from '@/redux/actions/product';

export const deleteProductUpdateState = (state: TProductState, action: TDeleteProductSuccess): TProductState => ({
  ...state,
  deleteProductResponse: action.payload.response,
});
