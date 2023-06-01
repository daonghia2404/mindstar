import { TCategoryState } from '@/redux/reducers/category';
import { TGetCategoriesSuccess } from '@/redux/actions/category';

export const getCategoriesUpdateState = (state: TCategoryState, action: TGetCategoriesSuccess): TCategoryState => ({
  ...state,
  getCategoriesResponse: action.payload.response,
});
