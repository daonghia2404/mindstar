import ApiService from '@/services/api';

// TYPES

export type TCreateInventoryHistoryParams = unknown;
export type TCreateInventoryHistoryBody = unknown;

export type TCreateInventoryHistoryMaterials = {
  params?: TCreateInventoryHistoryParams;
  body?: TCreateInventoryHistoryBody;
};

export type TCreateInventoryHistoryResponse = unknown;

// FUNCTION

export const createInventoryHistory = async ({
  params,
  body,
}: TCreateInventoryHistoryMaterials): Promise<TCreateInventoryHistoryResponse> => {
  const response = await ApiService.post(`/v1/api/admin/inventories`, body, { params });
  return response.data;
};
