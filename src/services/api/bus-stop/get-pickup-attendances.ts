import { TAttendance } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPickupAttendancesParams = {
  page: number;
  size: number;
  sort?: string;
  name?: string;
  busStopId?: string;
  fromDate?: number;
  toDate?: number;
};

export type TGetPickupAttendancesMaterials = {
  params?: TGetPickupAttendancesParams;
  headers?: THeaderBranchIds;
};

export type TGetPickupAttendancesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    total_absent: number;
    total_present: number;
    content: TAttendance[];
  };
};

// FUNCTION

export const getPickupAttendances = async ({
  params,
  headers,
}: TGetPickupAttendancesMaterials): Promise<TGetPickupAttendancesResponse> => {
  const response = await ApiService.get(
    `/v1/api/admin/bus-stops${params?.busStopId ? `/${params.busStopId}` : ''}/pickup-attendances`,
    { params, headers },
  );
  return response.data;
};
