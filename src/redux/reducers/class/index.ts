import { createReducer } from 'deox';

import { TGetClassesResponse } from '@/services/api/class';
import { getClassesAction } from '@/redux/actions';
import { getClassesUpdateState } from './get-classes';

export type TClassState = {
  getClassesResponse?: TGetClassesResponse;
};

const initialState: TClassState = {
  getClassesResponse: undefined,
};

const ClassReducer = createReducer(initialState, (handleAction) => [
  handleAction(getClassesAction.success, getClassesUpdateState),
]);

export default ClassReducer;
