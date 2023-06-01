import { createReducer } from 'deox';

import {
  TCreateProductResponse,
  TDeleteProductResponse,
  TGetProductResponse,
  TGetProductsResponse,
  TUpdateProductResponse,
} from '@/services/api/product';
import {
  createProductAction,
  deleteProductAction,
  getProductAction,
  getProductsAction,
  updateProductAction,
} from '@/redux/actions';
import { createProductUpdateState } from './create-product';
import { deleteProductUpdateState } from './delete-product';
import { getProductUpdateState } from './get-product';
import { getProductsUpdateState } from './get-products';
import { updateProductUpdateState } from './update-product';

export type TProductState = {
  createProductResponse?: TCreateProductResponse;
  deleteProductResponse?: TDeleteProductResponse;
  getProductResponse?: TGetProductResponse;
  getProductsResponse?: TGetProductsResponse;
  updateProductResponse?: TUpdateProductResponse;
};

const initialState: TProductState = {
  createProductResponse: undefined,
  deleteProductResponse: undefined,
  getProductResponse: undefined,
  getProductsResponse: undefined,
  updateProductResponse: undefined,
};

const ProductReducer = createReducer(initialState, (handleAction) => [
  handleAction(createProductAction.success, createProductUpdateState),
  handleAction(deleteProductAction.success, deleteProductUpdateState),
  handleAction(getProductAction.success, getProductUpdateState),
  handleAction(getProductsAction.success, getProductsUpdateState),
  handleAction(updateProductAction.success, updateProductUpdateState),
]);

export default ProductReducer;
