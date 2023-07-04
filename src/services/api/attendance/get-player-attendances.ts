import { TAttendance } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPlayerAttendancesPaths = {
  id: string | number;
};
export type TGetPlayerAttendancesParams = {
  page: number;
  size: number;
  sort?: string;
  fromDate?: number;
  toDate?: number;
};

export type TGetPlayerAttendancesMaterials = {
  paths?: TGetPlayerAttendancesPaths;
  params?: TGetPlayerAttendancesParams;
  headers?: THeaderBranchIds;
};

export type TGetPlayerAttendancesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TAttendance[];
  };
};

// FUNCTION

export const getPlayerAttendances = async ({
  paths,
  params,
  headers,
}: TGetPlayerAttendancesMaterials): Promise<TGetPlayerAttendancesResponse> => {
  const response = await ApiService.get(`/v1/api/attendances/player/${paths?.id}`, { params, headers });
  return response.data;
};
