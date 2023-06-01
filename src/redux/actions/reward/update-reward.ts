import { createActionCreator } from 'deox';

import { TUpdateRewardMaterials, TUpdateRewardResponse } from '@/services/api/reward/update-reward';

// CONSTANTS

export enum EUpdateRewardAction {
  UPDATE_REWARD = 'UPDATE_REWARD',
  UPDATE_REWARD_REQUEST = 'UPDATE_REWARD_REQUEST',
  UPDATE_REWARD_SUCCESS = 'UPDATE_REWARD_SUCCESS',
  UPDATE_REWARD_FAILED = 'UPDATE_REWARD_FAILED',
}

// TYPES

export type TUpdateRewardRequest = {
  type: EUpdateRewardAction.UPDATE_REWARD_REQUEST;
  payload: {
    materials: TUpdateRewardMaterials;
    successCallback?: (response: TUpdateRewardResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateRewardSuccess = {
  type: EUpdateRewardAction.UPDATE_REWARD_SUCCESS;
  payload: { response: TUpdateRewardResponse };
};

export type TUpdateRewardFailed = { type: EUpdateRewardAction.UPDATE_REWARD_FAILED };

// FUNCTION

export const updateRewardAction = {
  request: createActionCreator(
    EUpdateRewardAction.UPDATE_REWARD_REQUEST,
    (resolve) =>
      (
        materials: TUpdateRewardMaterials,
        successCallback?: (response: TUpdateRewardResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateRewardRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateRewardAction.UPDATE_REWARD_SUCCESS,
    (resolve) =>
      (response: TUpdateRewardResponse): TUpdateRewardSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateRewardAction.UPDATE_REWARD_FAILED,
    (resolve) =>
      (error: unknown): TUpdateRewardFailed =>
        resolve({ error }),
  ),
};
