import { TPickupAttendance } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetPickupAttendancePlayersPaths = {
  id: string | number;
};
export type TGetPickupAttendancePlayersParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
};

export type TGetPickupAttendancePlayersMaterials = {
  paths?: TGetPickupAttendancePlayersPaths;
  params?: TGetPickupAttendancePlayersParams;
  headers?: THeaderBranchIds;
};

export type TGetPickupAttendancePlayersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TPickupAttendance[];
  };
};

// FUNCTION

export const getPickupAttendancePlayers = async ({
  paths,
  params,
  headers,
}: TGetPickupAttendancePlayersMaterials): Promise<TGetPickupAttendancePlayersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/bus-stops/${paths?.id}/edit-pickup-attendances`, {
    params,
    headers,
  });
  return response.data;
};
