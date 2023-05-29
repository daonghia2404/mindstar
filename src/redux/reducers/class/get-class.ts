import { TClassState } from '@/redux/reducers/class';
import { TGetClassSuccess } from '@/redux/actions/class';

export const getClassUpdateState = (state: TClassState, action: TGetClassSuccess): TClassState => ({
  ...state,
  getClassResponse: action.payload.response,
});
