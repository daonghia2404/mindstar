import { TAttendance } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetAttendancesParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
  classId?: string;
  search?: string;
  sort?: string;
};

export type TGetAttendancesMaterials = {
  params?: TGetAttendancesParams;
  headers?: THeaderBranchIds;
  isManager?: boolean;
};

export type TGetAttendancesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    attendance_count: { checked_in: number; count: number }[];
    content: TAttendance[];
  };
};

// FUNCTION

export const getAttendances = async ({
  params,
  headers,
  isManager,
}: TGetAttendancesMaterials): Promise<TGetAttendancesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/attendances${isManager ? '/teacher-view' : ''}`, {
    params,
    headers,
  });
  return response.data;
};
