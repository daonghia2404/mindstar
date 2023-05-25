import { TClass } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetClassesParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
};

export type TGetClassesMaterials = {
  params?: TGetClassesParams;
  headers?: THeaderBranchIds;
};

export type TGetClassesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TClass[];
  };
};

// FUNCTION

export const getClasses = async ({ params, headers }: TGetClassesMaterials): Promise<TGetClassesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/classes`, { params, headers });
  return response.data;
};
