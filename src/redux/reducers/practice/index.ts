import { createReducer } from 'deox';

import { TDeletePracticeResponse, TGetPracticesResponse } from '@/services/api/practice';
import { deletePracticeAction, getPracticesAction } from '@/redux/actions';
import { deletePracticeUpdateState } from './delete-practice';
import { getPracticesUpdateState } from './get-practices';

export type TPracticeState = {
  deletePracticeResponse?: TDeletePracticeResponse;
  getPracticesResponse?: TGetPracticesResponse;
};

const initialState: TPracticeState = {
  deletePracticeResponse: undefined,
  getPracticesResponse: undefined,
};

const PracticeReducer = createReducer(initialState, (handleAction) => [
  handleAction(deletePracticeAction.success, deletePracticeUpdateState),
  handleAction(getPracticesAction.success, getPracticesUpdateState),
]);

export default PracticeReducer;
