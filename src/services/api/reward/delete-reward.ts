import ApiService from '@/services/api';

// TYPES

export type TDeleteRewardPaths = {
  id: string | number;
};
export type TDeleteRewardParams = unknown;

export type TDeleteRewardMaterials = {
  paths?: TDeleteRewardPaths;
  params?: TDeleteRewardParams;
};

export type TDeleteRewardResponse = unknown;

// FUNCTION

export const deleteReward = async ({ paths, params }: TDeleteRewardMaterials): Promise<TDeleteRewardResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/rewards/${paths?.id}`, { params });
  return response.data;
};
