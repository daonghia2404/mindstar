import { TUser } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetUsersParams = {
  page: number;
  size: number;
  userType?: string;
  sort?: string;
  search?: string;
  auditingStatuses?: string;
};

export type TGetUsersPaths = {
  suffix: string;
};

export type TGetUsersMaterials = {
  params?: TGetUsersParams;
  paths?: TGetUsersPaths;
  headers?: THeaderBranchIds;
};

export type TGetUsersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TUser[];
  };
};

// FUNCTION

export const getUsers = async ({ params, headers, paths }: TGetUsersMaterials): Promise<TGetUsersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/users/${paths?.suffix}`, { params, headers });
  return response.data;
};
