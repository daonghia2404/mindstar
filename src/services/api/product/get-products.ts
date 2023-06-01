import { TProduct } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetProductsParams = {
  page: number;
  size: number;
  sort?: string;
  auditingStatuses?: string;
  categoryId?: string;
  search?: string;
};

export type TGetProductsMaterials = {
  params?: TGetProductsParams;
  headers?: THeaderBranchIds;
};

export type TGetProductsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TProduct[];
  };
};

// FUNCTION

export const getProducts = async ({ params, headers }: TGetProductsMaterials): Promise<TGetProductsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/products`, { params, headers });
  return response.data;
};
