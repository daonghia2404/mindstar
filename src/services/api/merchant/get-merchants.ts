import { TMerchant } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetMerchantsParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
  auditingStatuses?: string;
  registrationStatuses?: string;
};

export type TGetMerchantsMaterials = {
  headers?: THeaderBranchIds;
  params?: TGetMerchantsParams;
};

export type TGetMerchantsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TMerchant[];
  };
};

// FUNCTION

export const getMerchants = async ({ params, headers }: TGetMerchantsMaterials): Promise<TGetMerchantsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/merchants`, { params, headers });
  return response.data;
};
