import ApiService from '@/services/api';

// TYPES

export type TUpdateMerchantFeedPaths = {
  id: string | number;
};
export type TUpdateMerchantFeedBody = unknown;

export type TUpdateMerchantFeedMaterials = {
  paths?: TUpdateMerchantFeedPaths;
  body?: TUpdateMerchantFeedBody;
};

export type TUpdateMerchantFeedResponse = unknown;

// FUNCTION

export const updateMerchantFeed = async ({
  paths,
  body,
}: TUpdateMerchantFeedMaterials): Promise<TUpdateMerchantFeedResponse> => {
  const response = await ApiService.patch(`/v1/api/admin/merchant-feeds/${paths?.id}`, body);
  return response.data;
};
