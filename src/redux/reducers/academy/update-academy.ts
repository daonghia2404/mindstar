import { TAcademyState } from '@/redux/reducers/academy';
import { TUpdateAcademySuccess } from '@/redux/actions/academy';

export const updateAcademyUpdateState = (state: TAcademyState, action: TUpdateAcademySuccess): TAcademyState => ({
  ...state,
  updateAcademyResponse: action.payload.response,
});
