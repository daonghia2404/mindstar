import { createReducer } from 'deox';

import { TDeletePracticeResponse, TGetPracticesResponse, TUpdatePracticeResponse } from '@/services/api/practice';
import { deletePracticeAction, getPracticesAction, updatePracticeAction } from '@/redux/actions';
import { deletePracticeUpdateState } from './delete-practice';
import { getPracticesUpdateState } from './get-practices';
import { updatePracticeUpdateState } from './update-practice';

export type TPracticeState = {
  deletePracticeResponse?: TDeletePracticeResponse;
  getPracticesResponse?: TGetPracticesResponse;
  updatePracticeResponse?: TUpdatePracticeResponse;
};

const initialState: TPracticeState = {
  deletePracticeResponse: undefined,
  getPracticesResponse: undefined,
  updatePracticeResponse: undefined,
};

const PracticeReducer = createReducer(initialState, (handleAction) => [
  handleAction(deletePracticeAction.success, deletePracticeUpdateState),
  handleAction(getPracticesAction.success, getPracticesUpdateState),
  handleAction(updatePracticeAction.success, updatePracticeUpdateState),
]);

export default PracticeReducer;
