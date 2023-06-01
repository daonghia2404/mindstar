import { TReward } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdateRewardPaths = {
  id: string | number;
};
export type TUpdateRewardBody = unknown;

export type TUpdateRewardMaterials = {
  paths?: TUpdateRewardPaths;
  body?: TUpdateRewardBody;
};

export type TUpdateRewardResponse = TCommonResponse & {
  data: TReward;
};

// FUNCTION

export const updateReward = async ({ paths, body }: TUpdateRewardMaterials): Promise<TUpdateRewardResponse> => {
  const response = await ApiService.patch(`/v1/api/admin/rewards/${paths?.id}`, body);
  return response.data;
};
