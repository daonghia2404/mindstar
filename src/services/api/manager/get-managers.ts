import { TUser } from '@/common/models';
import { TCommonPaginate, TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetManagersParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
};

export type TGetManagersMaterials = {
  params?: TGetManagersParams;
};

export type TGetManagersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TUser[];
  };
};

// FUNCTION

export const getManagers = async ({ params }: TGetManagersMaterials): Promise<TGetManagersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/managers`, { params });
  return response.data;
};
