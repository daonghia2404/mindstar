import { TClassState } from '@/redux/reducers/class';
import { TCreateClassSuccess } from '@/redux/actions/class';

export const createClassUpdateState = (state: TClassState, action: TCreateClassSuccess): TClassState => ({
  ...state,
  createClassResponse: action.payload.response,
});
