import { createActionCreator } from 'deox';

import { TGetRewardsMaterials, TGetRewardsResponse } from '@/services/api/reward/get-rewards';

// CONSTANTS

export enum EGetRewardsAction {
  GET_REWARDS = 'GET_REWARDS',
  GET_REWARDS_REQUEST = 'GET_REWARDS_REQUEST',
  GET_REWARDS_SUCCESS = 'GET_REWARDS_SUCCESS',
  GET_REWARDS_FAILED = 'GET_REWARDS_FAILED',
}

// TYPES

export type TGetRewardsRequest = {
  type: EGetRewardsAction.GET_REWARDS_REQUEST;
  payload: {
    materials: TGetRewardsMaterials;
    successCallback?: (response: TGetRewardsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetRewardsSuccess = {
  type: EGetRewardsAction.GET_REWARDS_SUCCESS;
  payload: { response: TGetRewardsResponse };
};

export type TGetRewardsFailed = { type: EGetRewardsAction.GET_REWARDS_FAILED };

// FUNCTION

export const getRewardsAction = {
  request: createActionCreator(
    EGetRewardsAction.GET_REWARDS_REQUEST,
    (resolve) =>
      (
        materials: TGetRewardsMaterials,
        successCallback?: (response: TGetRewardsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetRewardsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetRewardsAction.GET_REWARDS_SUCCESS,
    (resolve) =>
      (response: TGetRewardsResponse): TGetRewardsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetRewardsAction.GET_REWARDS_FAILED,
    (resolve) =>
      (error: unknown): TGetRewardsFailed =>
        resolve({ error }),
  ),
};
