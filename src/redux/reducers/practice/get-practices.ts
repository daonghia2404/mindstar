import { TPracticeState } from '@/redux/reducers/practice';
import { TGetPracticesSuccess } from '@/redux/actions/practice';

export const getPracticesUpdateState = (state: TPracticeState, action: TGetPracticesSuccess): TPracticeState => ({
  ...state,
  getPracticesResponse: action.payload.response,
});
