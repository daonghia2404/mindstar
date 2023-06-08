import { TAttendance } from '@/common/models';
import { TCommonPaginate, TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetAttendancePlayersParams = {
  fromDate?: number;
  toDate?: number;
  classId?: string;
};

export type TGetAttendancePlayersMaterials = {
  params?: TGetAttendancePlayersParams;
  isManager?: boolean;
};

export type TGetAttendancePlayersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TAttendance[];
  };
};

// FUNCTION

export const getAttendancePlayers = async ({
  params,
  isManager,
}: TGetAttendancePlayersMaterials): Promise<TGetAttendancePlayersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/attendances/${isManager ? 'teacher' : 'player'}`, { params });
  return response.data;
};
