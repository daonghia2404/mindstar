import { createActionCreator } from 'deox';

import { TCreateRewardMaterials, TCreateRewardResponse } from '@/services/api/reward/create-reward';

// CONSTANTS

export enum ECreateRewardAction {
  CREATE_REWARD = 'CREATE_REWARD',
  CREATE_REWARD_REQUEST = 'CREATE_REWARD_REQUEST',
  CREATE_REWARD_SUCCESS = 'CREATE_REWARD_SUCCESS',
  CREATE_REWARD_FAILED = 'CREATE_REWARD_FAILED',
}

// TYPES

export type TCreateRewardRequest = {
  type: ECreateRewardAction.CREATE_REWARD_REQUEST;
  payload: {
    materials: TCreateRewardMaterials;
    successCallback?: (response: TCreateRewardResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateRewardSuccess = {
  type: ECreateRewardAction.CREATE_REWARD_SUCCESS;
  payload: { response: TCreateRewardResponse };
};

export type TCreateRewardFailed = { type: ECreateRewardAction.CREATE_REWARD_FAILED };

// FUNCTION

export const createRewardAction = {
  request: createActionCreator(
    ECreateRewardAction.CREATE_REWARD_REQUEST,
    (resolve) =>
      (
        materials: TCreateRewardMaterials,
        successCallback?: (response: TCreateRewardResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateRewardRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateRewardAction.CREATE_REWARD_SUCCESS,
    (resolve) =>
      (response: TCreateRewardResponse): TCreateRewardSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateRewardAction.CREATE_REWARD_FAILED,
    (resolve) =>
      (error: unknown): TCreateRewardFailed =>
        resolve({ error }),
  ),
};
