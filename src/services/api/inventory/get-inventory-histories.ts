import { TInventoryHistory } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetInventoryHistoriesParams = {
  page: number;
  size: number;
  sort?: string;
  search?: string;
};

export type TGetInventoryHistoriesMaterials = {
  params?: TGetInventoryHistoriesParams;
  headers?: THeaderBranchIds;
};

export type TGetInventoryHistoriesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TInventoryHistory[];
  };
};

// FUNCTION

export const getInventoryHistories = async ({
  params,
  headers,
}: TGetInventoryHistoriesMaterials): Promise<TGetInventoryHistoriesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/inventories/history`, { params, headers });
  return response.data;
};
