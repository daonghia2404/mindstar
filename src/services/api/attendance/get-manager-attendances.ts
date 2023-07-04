import { TAttendance } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetManagerAttendancesPaths = {
  id: string | number;
};
export type TGetManagerAttendancesParams = {
  page: number;
  size: number;
  sort?: string;
  fromDate?: number;
  toDate?: number;
};

export type TGetManagerAttendancesMaterials = {
  paths?: TGetManagerAttendancesPaths;
  params?: TGetManagerAttendancesParams;
  headers?: THeaderBranchIds;
};

export type TGetManagerAttendancesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TAttendance[];
  };
};

// FUNCTION

export const getManagerAttendances = async ({
  paths,
  params,
  headers,
}: TGetManagerAttendancesMaterials): Promise<TGetManagerAttendancesResponse> => {
  const response = await ApiService.get(`/v1/api/attendances/teacher/${paths?.id}`, { params, headers });
  return response.data;
};
