import { createReducer } from 'deox';

import { TGetMyAcademyResponse, TUpdateAcademyResponse } from '@/services/api/academy';
import { getMyAcademyAction, updateAcademyAction } from '@/redux/actions';
import { getMyAcademyUpdateState } from './get-my-academy';
import { updateAcademyUpdateState } from './update-academy';

export type TAcademyState = {
  getMyAcademyResponse?: TGetMyAcademyResponse;
  updateAcademyResponse?: TUpdateAcademyResponse;
};

const initialState: TAcademyState = {
  getMyAcademyResponse: undefined,
  updateAcademyResponse: undefined,
};

const AcademyReducer = createReducer(initialState, (handleAction) => [
  handleAction(getMyAcademyAction.success, getMyAcademyUpdateState),
  handleAction(updateAcademyAction.success, updateAcademyUpdateState),
]);

export default AcademyReducer;
