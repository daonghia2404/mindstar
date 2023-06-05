import { TSupplier } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetSuppliersParams = {
  page: number;
  size: number;
  search?: string;
  sort?: string;
  auditingStatuses?: string;
};

export type TGetSuppliersMaterials = {
  params?: TGetSuppliersParams;
  headers?: THeaderBranchIds;
};

export type TGetSuppliersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TSupplier[];
  };
};

// FUNCTION

export const getSuppliers = async ({ params, headers }: TGetSuppliersMaterials): Promise<TGetSuppliersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/suppliers`, { params, headers });
  return response.data;
};
