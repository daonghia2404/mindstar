import ApiService from '@/services/api';

// TYPES

export type TDeleteInventoryHistoryPaths = {
  id: string | number;
};
export type TDeleteInventoryHistoryParams = unknown;

export type TDeleteInventoryHistoryMaterials = {
  paths?: TDeleteInventoryHistoryPaths;
  params?: TDeleteInventoryHistoryParams;
};

export type TDeleteInventoryHistoryResponse = unknown;

// FUNCTION

export const deleteInventoryHistory = async ({
  paths,
  params,
}: TDeleteInventoryHistoryMaterials): Promise<TDeleteInventoryHistoryResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/inventories/${paths?.id}`, { params });
  return response.data;
};
