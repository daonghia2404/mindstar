import { TOrder } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetOrdersParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
  orderStatus?: string;
  transactionStatuses?: string;
  search?: string;
  sort?: string;
};

export type TGetOrdersMaterials = {
  params?: TGetOrdersParams;
  headers?: THeaderBranchIds;
};

export type TGetOrdersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TOrder[];
  };
};

// FUNCTION

export const getOrders = async ({ params, headers }: TGetOrdersMaterials): Promise<TGetOrdersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/orders`, { params, headers });
  return response.data;
};
