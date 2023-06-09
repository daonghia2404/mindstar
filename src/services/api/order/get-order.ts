import { TOrder } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetOrderPaths = {
  id: string | number;
};
export type TGetOrderParams = unknown;

export type TGetOrderMaterials = {
  paths?: TGetOrderPaths;
  params?: TGetOrderParams;
};

export type TGetOrderResponse = TCommonResponse & {
  data: TOrder;
};

// FUNCTION

export const getOrder = async ({ paths, params }: TGetOrderMaterials): Promise<TGetOrderResponse> => {
  const response = await ApiService.get(`/v1/api/admin/orders/${paths?.id}`, { params });
  return response.data;
};
