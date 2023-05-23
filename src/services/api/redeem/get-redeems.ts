import { TRedeem } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetRedeemsParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
};

export type TGetRedeemsMaterials = {
  params?: TGetRedeemsParams;
  headers?: THeaderBranchIds;
};

export type TGetRedeemsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TRedeem[];
  };
};

// FUNCTION

export const getRedeems = async ({ params, headers }: TGetRedeemsMaterials): Promise<TGetRedeemsResponse> => {
  const response = await ApiService.get(`v1/api/admin/redeems`, { params, headers });
  return response.data;
};
