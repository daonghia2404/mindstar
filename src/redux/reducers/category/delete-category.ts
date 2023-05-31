import { TCategoryState } from '@/redux/reducers/category';
import { TDeleteCategorySuccess } from '@/redux/actions/category';

export const deleteCategoryUpdateState = (state: TCategoryState, action: TDeleteCategorySuccess): TCategoryState => ({
  ...state,
  deleteCategoryResponse: action.payload.response,
});
