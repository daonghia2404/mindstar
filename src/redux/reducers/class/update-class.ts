import { TClassState } from '@/redux/reducers/class';
import { TUpdateClassSuccess } from '@/redux/actions/class';

export const updateClassUpdateState = (state: TClassState, action: TUpdateClassSuccess): TClassState => ({
  ...state,
  updateClassResponse: action.payload.response,
});
