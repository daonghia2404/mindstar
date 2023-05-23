import ApiService, { TGetBranchesParams, TGetBranchesResponse } from '@/services/api';

// TYPES

export type TGetCommonBranchesParams = TGetBranchesParams;

export type TGetCommonBranchesMaterials = {
  params?: TGetCommonBranchesParams;
};

export type TGetCommonBranchesResponse = TGetBranchesResponse;

// FUNCTION

export const getCommonBranches = async ({
  params,
}: TGetCommonBranchesMaterials): Promise<TGetCommonBranchesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/branches`, { params });
  return response.data;
};
