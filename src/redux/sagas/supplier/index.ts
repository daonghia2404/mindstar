import { all, takeLatest } from 'redux-saga/effects';

import { createSupplierAction, deleteSupplierAction, getSuppliersAction, updateSupplierAction } from '@/redux/actions';

import { createSupplierSaga } from './create-supplier';
import { deleteSupplierSaga } from './delete-supplier';
import { getSuppliersSaga } from './get-suppliers';
import { updateSupplierSaga } from './update-supplier';

export default function* root(): Generator {
  yield all([
    takeLatest(createSupplierAction.request.type, createSupplierSaga),
    takeLatest(deleteSupplierAction.request.type, deleteSupplierSaga),
    takeLatest(getSuppliersAction.request.type, getSuppliersSaga),
    takeLatest(updateSupplierAction.request.type, updateSupplierSaga),
  ]);
}
