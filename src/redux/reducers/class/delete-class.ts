import { TClassState } from '@/redux/reducers/class';
import { TDeleteClassSuccess } from '@/redux/actions/class';

export const deleteClassUpdateState = (state: TClassState, action: TDeleteClassSuccess): TClassState => ({
  ...state,
  deleteClassResponse: action.payload.response,
});
