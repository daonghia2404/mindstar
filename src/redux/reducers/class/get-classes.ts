import { TClassState } from '@/redux/reducers/class';
import { TGetClassesSuccess } from '@/redux/actions/class';

export const getClassesUpdateState = (state: TClassState, action: TGetClassesSuccess): TClassState => ({
  ...state,
  getClassesResponse: action.payload.response,
});
