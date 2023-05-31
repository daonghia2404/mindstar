import { TBranch } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPublicBranchesParams = unknown;

export type TGetPublicBranchesMaterials = {
  params?: TGetPublicBranchesParams;
};

export type TGetPublicBranchesResponse = TCommonResponse & {
  data: TBranch[];
};

// FUNCTION

export const getPublicBranches = async ({
  params,
}: TGetPublicBranchesMaterials): Promise<TGetPublicBranchesResponse> => {
  const response = await ApiService.get(`/v1/api/public/branches/eras?academyId=1`, { params });
  return response.data;
};
