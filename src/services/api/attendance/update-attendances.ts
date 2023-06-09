import { THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdateAttendancesParams = unknown;
export type TUpdateAttendancesBody = unknown;

export type TUpdateAttendancesMaterials = {
  params?: TUpdateAttendancesParams;
  body?: TUpdateAttendancesBody;
  isManager?: boolean;
  headers?: THeaderBranchIds;
};

export type TUpdateAttendancesResponse = unknown;

// FUNCTION

export const updateAttendances = async ({
  params,
  body,
  isManager,
  headers,
}: TUpdateAttendancesMaterials): Promise<TUpdateAttendancesResponse> => {
  const response = await ApiService.post(`/v1/api/admin/attendances/${isManager ? 'teachers' : 'players'}`, body, {
    params,
    headers,
  });
  return response.data;
};
