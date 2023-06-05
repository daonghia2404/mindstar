import { TAcademyState } from '@/redux/reducers/academy';
import { TGetMyAcademySuccess } from '@/redux/actions/academy';

export const getMyAcademyUpdateState = (state: TAcademyState, action: TGetMyAcademySuccess): TAcademyState => ({
  ...state,
  getMyAcademyResponse: action.payload.response,
});
