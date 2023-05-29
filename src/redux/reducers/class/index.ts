import { createReducer } from 'deox';

import {
  TCreateClassResponse,
  TDeleteClassResponse,
  TGetClassResponse,
  TGetClassesResponse,
  TUpdateClassResponse,
} from '@/services/api/class';
import {
  createClassAction,
  deleteClassAction,
  getClassAction,
  getClassesAction,
  updateClassAction,
} from '@/redux/actions';
import { createClassUpdateState } from './create-class';
import { deleteClassUpdateState } from './delete-class';
import { getClassUpdateState } from './get-class';
import { getClassesUpdateState } from './get-classes';
import { updateClassUpdateState } from './update-class';

export type TClassState = {
  createClassResponse?: TCreateClassResponse;
  deleteClassResponse?: TDeleteClassResponse;
  getClassResponse?: TGetClassResponse;
  getClassesResponse?: TGetClassesResponse;
  updateClassResponse?: TUpdateClassResponse;
};

const initialState: TClassState = {
  createClassResponse: undefined,
  deleteClassResponse: undefined,
  getClassResponse: undefined,
  getClassesResponse: undefined,
  updateClassResponse: undefined,
};

const ClassReducer = createReducer(initialState, (handleAction) => [
  handleAction(createClassAction.success, createClassUpdateState),
  handleAction(deleteClassAction.success, deleteClassUpdateState),
  handleAction(getClassAction.success, getClassUpdateState),
  handleAction(getClassesAction.success, getClassesUpdateState),
  handleAction(updateClassAction.success, updateClassUpdateState),
]);

export default ClassReducer;
