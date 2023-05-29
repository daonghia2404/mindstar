import { TEConnect } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetEConnectsParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
};

export type TGetEConnectsMaterials = {
  params?: TGetEConnectsParams;
  headers?: THeaderBranchIds;
};

export type TGetEConnectsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TEConnect[];
  };
};

// FUNCTION

export const getEConnects = async ({ params, headers }: TGetEConnectsMaterials): Promise<TGetEConnectsResponse> => {
  const response = await ApiService.get(`/v1/api/e-connect/feeds`, { params, headers });
  return response.data;
};
