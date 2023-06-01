import { TReward } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetRewardsParams = {
  page: number;
  size: number;
  search?: string;
  auditingStatuses?: string;
  fromPoint?: number;
  toPoint?: number;
  sort?: string;
};

export type TGetRewardsMaterials = {
  params?: TGetRewardsParams;
  headers?: THeaderBranchIds;
};

export type TGetRewardsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TReward[];
  };
};

// FUNCTION

export const getRewards = async ({ params, headers }: TGetRewardsMaterials): Promise<TGetRewardsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/rewards`, { params, headers });
  return response.data;
};
