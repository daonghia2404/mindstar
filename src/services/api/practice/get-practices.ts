import { TUser } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPracticesParams = {
  page: number;
  size: number;
  sort?: string;
  search?: string;
};

export type TGetPracticesMaterials = {
  params?: TGetPracticesParams;
  headers?: THeaderBranchIds;
};

export type TGetPracticesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TUser[];
  };
};

// FUNCTION

export const getPractices = async ({ params, headers }: TGetPracticesMaterials): Promise<TGetPracticesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/practices`, { params, headers });
  return response.data;
};
