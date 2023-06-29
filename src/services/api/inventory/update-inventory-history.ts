import ApiService from '@/services/api';

// TYPES

export type TUpdateInventoryHistoryPaths = {
  id: string | number;
};
export type TUpdateInventoryHistoryBody = unknown;

export type TUpdateInventoryHistoryMaterials = {
  paths?: TUpdateInventoryHistoryPaths;
  body?: TUpdateInventoryHistoryBody;
};

export type TUpdateInventoryHistoryResponse = unknown;

// FUNCTION

export const updateInventoryHistory = async ({
  paths,
  body,
}: TUpdateInventoryHistoryMaterials): Promise<TUpdateInventoryHistoryResponse> => {
  const response = await ApiService.put(`/v1/api/admin/inventories/${paths?.id}`, body);
  return response.data;
};
