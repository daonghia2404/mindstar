import { TPracticeState } from '@/redux/reducers/practice';
import { TDeletePracticeSuccess } from '@/redux/actions/practice';

export const deletePracticeUpdateState = (state: TPracticeState, action: TDeletePracticeSuccess): TPracticeState => ({
  ...state,
  deletePracticeResponse: action.payload.response,
});
