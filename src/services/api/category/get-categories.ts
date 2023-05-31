import { TCategory } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetCategoriesParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
};

export type TGetCategoriesMaterials = {
  params?: TGetCategoriesParams;
  headers?: THeaderBranchIds;
};

export type TGetCategoriesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TCategory[];
  };
};

// FUNCTION

export const getCategories = async ({ params }: TGetCategoriesMaterials): Promise<TGetCategoriesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/categories`, { params });
  return response.data;
};
