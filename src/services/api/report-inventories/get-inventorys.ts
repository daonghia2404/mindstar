import { TReportInventory } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetInventorysParams = {
  page: number;
  size: number;
  sort?: string;
  auditingStatuses?: string | number;
  categoryId?: string;
  search?: string;
};

export type TGetInventorysMaterials = {
  params?: TGetInventorysParams;
  headers?: THeaderBranchIds;
};

export type TGetInventorysResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TReportInventory[];
  };
};

// FUNCTION

export const getInventorys = async ({ params }: TGetInventorysMaterials): Promise<TGetInventorysResponse> => {
  const response = await ApiService.get(`/v1/api/admin/inventories`, { params });
  return response.data;
};
