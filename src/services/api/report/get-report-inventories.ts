import { TInventory } from '@/common/models';
import { THeaderBranchIds, TCommonResponse, TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetReportInventoriesParams = {
  page: number;
  size: number;
  sort?: string;
  search?: string;
};

export type TGetReportInventoriesMaterials = {
  params?: TGetReportInventoriesParams;
  headers?: THeaderBranchIds;
};

export type TGetReportInventoriesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TInventory[];
  };
};

// FUNCTION

export const getReportInventories = async ({
  params,
}: TGetReportInventoriesMaterials): Promise<TGetReportInventoriesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/inventories`, { params });
  return response.data;
};
