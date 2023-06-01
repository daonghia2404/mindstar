import { TReward } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TCreateRewardParams = unknown;
export type TCreateRewardBody = unknown;

export type TCreateRewardMaterials = {
  params?: TCreateRewardParams;
  body?: TCreateRewardBody;
};

export type TCreateRewardResponse = TCommonResponse & {
  data: TReward;
};

// FUNCTION

export const createReward = async ({ params, body }: TCreateRewardMaterials): Promise<TCreateRewardResponse> => {
  const response = await ApiService.post(`/v1/api/admin/rewards`, body, { params });
  return response.data;
};
