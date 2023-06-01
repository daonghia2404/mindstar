import { TCategoryState } from '@/redux/reducers/category';
import { TCreateCategorySuccess } from '@/redux/actions/category';

export const createCategoryUpdateState = (state: TCategoryState, action: TCreateCategorySuccess): TCategoryState => ({
  ...state,
  createCategoryResponse: action.payload.response,
});
