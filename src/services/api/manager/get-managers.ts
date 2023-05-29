import { TUser } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetManagersParams = {
  page: number;
  size: number;
  userType?: string;
  sort?: string;
  name?: string;
};

export type TGetManagersMaterials = {
  params?: TGetManagersParams;
  headers?: THeaderBranchIds;
};

export type TGetManagersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TUser[];
  };
};

// FUNCTION

export const getManagers = async ({ params, headers }: TGetManagersMaterials): Promise<TGetManagersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/managers`, { params, headers });
  return response.data;
};
