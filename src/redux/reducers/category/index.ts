import { createReducer } from 'deox';

import {
  TCreateCategoryResponse,
  TDeleteCategoryResponse,
  TGetCategoriesResponse,
  TUpdateCategoryResponse,
} from '@/services/api/category';
import { createCategoryAction, deleteCategoryAction, getCategoriesAction, updateCategoryAction } from '@/redux/actions';
import { createCategoryUpdateState } from './create-category';
import { deleteCategoryUpdateState } from './delete-category';
import { getCategoriesUpdateState } from './get-categories';
import { updateCategoryUpdateState } from './update-category';

export type TCategoryState = {
  createCategoryResponse?: TCreateCategoryResponse;
  deleteCategoryResponse?: TDeleteCategoryResponse;
  getCategoriesResponse?: TGetCategoriesResponse;
  updateCategoryResponse?: TUpdateCategoryResponse;
};

const initialState: TCategoryState = {
  createCategoryResponse: undefined,
  deleteCategoryResponse: undefined,
  getCategoriesResponse: undefined,
  updateCategoryResponse: undefined,
};

const CategoryReducer = createReducer(initialState, (handleAction) => [
  handleAction(createCategoryAction.success, createCategoryUpdateState),
  handleAction(deleteCategoryAction.success, deleteCategoryUpdateState),
  handleAction(getCategoriesAction.success, getCategoriesUpdateState),
  handleAction(updateCategoryAction.success, updateCategoryUpdateState),
]);

export default CategoryReducer;
