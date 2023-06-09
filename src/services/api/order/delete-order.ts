import ApiService from '@/services/api';

// TYPES

export type TDeleteOrderPaths = {
  id: string | number;
};
export type TDeleteOrderParams = unknown;

export type TDeleteOrderMaterials = {
  paths?: TDeleteOrderPaths;
  params?: TDeleteOrderParams;
};

export type TDeleteOrderResponse = unknown;

// FUNCTION

export const deleteOrder = async ({ paths, params }: TDeleteOrderMaterials): Promise<TDeleteOrderResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/orders/${paths?.id}`, { params });
  return response.data;
};
