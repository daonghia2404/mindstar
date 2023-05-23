import { TBranch } from '@/common/models';
import { TCommonPaginate, TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetBranchesParams = {
  page: number;
  size: number;
  sort?: string;
  auditingStatuses?: string;
  branchName?: string;
};

export type TGetBranchesMaterials = {
  params?: TGetBranchesParams;
};

export type TGetBranchesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TBranch[];
  };
};

// FUNCTION

export const getBranches = async ({ params }: TGetBranchesMaterials): Promise<TGetBranchesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/branches`, { params });
  return response.data;
};
