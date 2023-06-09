import ApiService from '@/services/api';

// TYPES

export type TUpdateOrderPaths = {
  id: string | number;
};
export type TUpdateOrderBody = unknown;

export type TUpdateOrderMaterials = {
  paths?: TUpdateOrderPaths;
  body?: TUpdateOrderBody;
};

export type TUpdateOrderResponse = unknown;

// FUNCTION

export const updateOrder = async ({ paths, body }: TUpdateOrderMaterials): Promise<TUpdateOrderResponse> => {
  const response = await ApiService.put(`/v1/api/admin/orders/${paths?.id}`, body);
  return response.data;
};
