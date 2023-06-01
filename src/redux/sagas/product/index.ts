import { all, takeLatest } from 'redux-saga/effects';

import {
  createProductAction,
  deleteProductAction,
  getProductAction,
  getProductsAction,
  updateProductAction,
} from '@/redux/actions';

import { createProductSaga } from './create-product';
import { deleteProductSaga } from './delete-product';
import { getProductSaga } from './get-product';
import { getProductsSaga } from './get-products';
import { updateProductSaga } from './update-product';

export default function* root(): Generator {
  yield all([
    takeLatest(createProductAction.request.type, createProductSaga),
    takeLatest(deleteProductAction.request.type, deleteProductSaga),
    takeLatest(getProductAction.request.type, getProductSaga),
    takeLatest(getProductsAction.request.type, getProductsSaga),
    takeLatest(updateProductAction.request.type, updateProductSaga),
  ]);
}
