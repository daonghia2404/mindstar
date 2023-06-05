import ApiService from '@/services/api';

// TYPES

export type TUpdateRedeemPaths = {
  id: string | number;
};
export type TUpdateRedeemBody = unknown;

export type TUpdateRedeemMaterials = {
  paths?: TUpdateRedeemPaths;
  body?: TUpdateRedeemBody;
};

export type TUpdateRedeemResponse = unknown;

// FUNCTION

export const updateRedeem = async ({ paths, body }: TUpdateRedeemMaterials): Promise<TUpdateRedeemResponse> => {
  const response = await ApiService.put(`/v1/api/admin/redeems/${paths?.id}`, body);
  return response.data;
};
