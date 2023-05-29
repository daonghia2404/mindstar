import { TTimeOff } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetTimeOffsParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
  classIds?: string;
  search?: string;
  sort?: string;
};

export type TGetTimeOffsMaterials = {
  params?: TGetTimeOffsParams;
  headers?: THeaderBranchIds;
};

export type TGetTimeOffsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TTimeOff[];
  };
};

// FUNCTION

export const getTimeOffs = async ({ params, headers }: TGetTimeOffsMaterials): Promise<TGetTimeOffsResponse> => {
  const response = await ApiService.get(`/v1/api/admin/time-off`, { params, headers });
  return response.data;
};
