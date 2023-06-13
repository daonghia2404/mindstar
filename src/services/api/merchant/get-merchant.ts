import { TMerchant } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetMerchantPaths = {
  id: string | number;
};
export type TGetMerchantParams = unknown;

export type TGetMerchantMaterials = {
  paths?: TGetMerchantPaths;
  params?: TGetMerchantParams;
};

export type TGetMerchantResponse = TCommonResponse & {
  data: TMerchant;
};

// FUNCTION

export const getMerchant = async ({ paths, params }: TGetMerchantMaterials): Promise<TGetMerchantResponse> => {
  const response = await ApiService.get(`/v1/api/merchants/${paths?.id}`, { params });
  return response.data;
};
