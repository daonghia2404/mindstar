import ApiService from '@/services/api';

// TYPES

export type TCreateOrderParams = unknown;
export type TCreateOrderBody = unknown;

export type TCreateOrderMaterials = {
  params?: TCreateOrderParams;
  body?: TCreateOrderBody;
};

export type TCreateOrderResponse = unknown;

// FUNCTION

export const createOrder = async ({ params, body }: TCreateOrderMaterials): Promise<TCreateOrderResponse> => {
  const response = await ApiService.post(`/v1/api/admin/orders`, body, { params });
  return response.data;
};
