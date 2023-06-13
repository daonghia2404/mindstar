import { TMerchantFeed } from '@/common/models';
import { TCommonPaginate, TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetMerchantFeedsParams = {
  page: number;
  size: number;
  merchantId?: string | number;
  sort?: string;
  auditingStatus?: string;
};

export type TGetMerchantFeedsMaterials = {
  params?: TGetMerchantFeedsParams;
};

export type TGetMerchantFeedsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TMerchantFeed[];
  };
};

// FUNCTION

export const getMerchantFeeds = async ({ params }: TGetMerchantFeedsMaterials): Promise<TGetMerchantFeedsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/merchant-feeds`, { params });
  return response.data;
};
