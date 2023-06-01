import { TReward } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetRewardPaths = {
  id: string | number;
};
export type TGetRewardParams = unknown;

export type TGetRewardMaterials = {
  paths?: TGetRewardPaths;
  params?: TGetRewardParams;
};

export type TGetRewardResponse = TCommonResponse & {
  data: TReward;
};

// FUNCTION

export const getReward = async ({ paths, params }: TGetRewardMaterials): Promise<TGetRewardResponse> => {
  const response = await ApiService.get(`/v1/api/admin/rewards/${paths?.id}`, { params });
  return response.data;
};
