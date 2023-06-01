import { TCategoryState } from '@/redux/reducers/category';
import { TUpdateCategorySuccess } from '@/redux/actions/category';

export const updateCategoryUpdateState = (state: TCategoryState, action: TUpdateCategorySuccess): TCategoryState => ({
  ...state,
  updateCategoryResponse: action.payload.response,
});
