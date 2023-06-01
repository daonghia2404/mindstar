import { createActionCreator } from 'deox';

import { TDeleteRewardMaterials, TDeleteRewardResponse } from '@/services/api/reward/delete-reward';

// CONSTANTS

export enum EDeleteRewardAction {
  DELETE_REWARD = 'DELETE_REWARD',
  DELETE_REWARD_REQUEST = 'DELETE_REWARD_REQUEST',
  DELETE_REWARD_SUCCESS = 'DELETE_REWARD_SUCCESS',
  DELETE_REWARD_FAILED = 'DELETE_REWARD_FAILED',
}

// TYPES

export type TDeleteRewardRequest = {
  type: EDeleteRewardAction.DELETE_REWARD_REQUEST;
  payload: {
    materials: TDeleteRewardMaterials;
    successCallback?: (response: TDeleteRewardResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteRewardSuccess = {
  type: EDeleteRewardAction.DELETE_REWARD_SUCCESS;
  payload: { response: TDeleteRewardResponse };
};

export type TDeleteRewardFailed = { type: EDeleteRewardAction.DELETE_REWARD_FAILED };

// FUNCTION

export const deleteRewardAction = {
  request: createActionCreator(
    EDeleteRewardAction.DELETE_REWARD_REQUEST,
    (resolve) =>
      (
        materials: TDeleteRewardMaterials,
        successCallback?: (response: TDeleteRewardResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteRewardRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteRewardAction.DELETE_REWARD_SUCCESS,
    (resolve) =>
      (response: TDeleteRewardResponse): TDeleteRewardSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteRewardAction.DELETE_REWARD_FAILED,
    (resolve) =>
      (error: unknown): TDeleteRewardFailed =>
        resolve({ error }),
  ),
};
