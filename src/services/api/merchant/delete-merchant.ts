import ApiService from '@/services/api';

// TYPES

export type TDeleteMerchantPaths = {
  id: string | number;
};
export type TDeleteMerchantParams = unknown;

export type TDeleteMerchantMaterials = {
  paths?: TDeleteMerchantPaths;
  params?: TDeleteMerchantParams;
};

export type TDeleteMerchantResponse = unknown;

// FUNCTION

export const deleteMerchant = async ({ paths, params }: TDeleteMerchantMaterials): Promise<TDeleteMerchantResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/merchants/${paths?.id}`, { params });
  return response.data;
};
