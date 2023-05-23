import { TSchedule } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetSchedulesParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
};

export type TGetSchedulesMaterials = {
  params?: TGetSchedulesParams;
  headers?: THeaderBranchIds;
};

export type TGetSchedulesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TSchedule[];
  };
};

// FUNCTION

export const getSchedules = async ({ params, headers }: TGetSchedulesMaterials): Promise<TGetSchedulesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/schedules`, { params, headers });
  return response.data;
};
