import { TPracticeState } from '@/redux/reducers/practice';
import { TUpdatePracticeSuccess } from '@/redux/actions/practice';

export const updatePracticeUpdateState = (state: TPracticeState, action: TUpdatePracticeSuccess): TPracticeState => ({
  ...state,
  updatePracticeResponse: action.payload.response,
});
