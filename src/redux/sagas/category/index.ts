import { all, takeLatest } from 'redux-saga/effects';

import { createCategoryAction, deleteCategoryAction, getCategoriesAction, updateCategoryAction } from '@/redux/actions';

import { createCategorySaga } from './create-category';
import { deleteCategorySaga } from './delete-category';
import { getCategoriesSaga } from './get-categories';
import { updateCategorySaga } from './update-category';

export default function* root(): Generator {
  yield all([
    takeLatest(createCategoryAction.request.type, createCategorySaga),
    takeLatest(deleteCategoryAction.request.type, deleteCategorySaga),
    takeLatest(getCategoriesAction.request.type, getCategoriesSaga),
    takeLatest(updateCategoryAction.request.type, updateCategorySaga),
  ]);
}
