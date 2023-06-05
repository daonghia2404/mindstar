import { TUser } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetUsersParams = {
  page: number;
  size: number;
  sort?: string;
  search?: string;
  auditingStatuses?: string;
};

export type TGetUsersMaterials = {
  params?: TGetUsersParams;
  headers?: THeaderBranchIds;
};

export type TGetUsersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TUser[];
  };
};

// FUNCTION

export const getUsers = async ({ params, headers }: TGetUsersMaterials): Promise<TGetUsersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/users/user-type-restricted=player,teacher`, { params, headers });
  return response.data;
};
