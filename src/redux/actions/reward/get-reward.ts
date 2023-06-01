import { createActionCreator } from 'deox';

import { TGetRewardMaterials, TGetRewardResponse } from '@/services/api/reward/get-reward';

// CONSTANTS

export enum EGetRewardAction {
  GET_REWARD = 'GET_REWARD',
  GET_REWARD_REQUEST = 'GET_REWARD_REQUEST',
  GET_REWARD_SUCCESS = 'GET_REWARD_SUCCESS',
  GET_REWARD_FAILED = 'GET_REWARD_FAILED',
}

// TYPES

export type TGetRewardRequest = {
  type: EGetRewardAction.GET_REWARD_REQUEST;
  payload: {
    materials: TGetRewardMaterials;
    successCallback?: (response: TGetRewardResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetRewardSuccess = {
  type: EGetRewardAction.GET_REWARD_SUCCESS;
  payload: { response?: TGetRewardResponse };
};

export type TGetRewardFailed = { type: EGetRewardAction.GET_REWARD_FAILED };

// FUNCTION

export const getRewardAction = {
  request: createActionCreator(
    EGetRewardAction.GET_REWARD_REQUEST,
    (resolve) =>
      (
        materials: TGetRewardMaterials,
        successCallback?: (response: TGetRewardResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetRewardRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetRewardAction.GET_REWARD_SUCCESS,
    (resolve) =>
      (response?: TGetRewardResponse): TGetRewardSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetRewardAction.GET_REWARD_FAILED,
    (resolve) =>
      (error: unknown): TGetRewardFailed =>
        resolve({ error }),
  ),
};
