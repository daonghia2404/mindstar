import ApiService from '@/services/api';

// TYPES

export type TDeleteRedeemPaths = {
  id: string | number;
};
export type TDeleteRedeemParams = unknown;

export type TDeleteRedeemMaterials = {
  paths?: TDeleteRedeemPaths;
  params?: TDeleteRedeemParams;
};

export type TDeleteRedeemResponse = unknown;

// FUNCTION

export const deleteRedeem = async ({ paths, params }: TDeleteRedeemMaterials): Promise<TDeleteRedeemResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/redeems/${paths?.id}`, { params });
  return response.data;
};
