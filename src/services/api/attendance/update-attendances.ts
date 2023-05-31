import ApiService from '@/services/api';

// TYPES

export type TUpdateAttendancesParams = unknown;
export type TUpdateAttendancesBody = unknown;

export type TUpdateAttendancesMaterials = {
  params?: TUpdateAttendancesParams;
  body?: TUpdateAttendancesBody;
};

export type TUpdateAttendancesResponse = unknown;

// FUNCTION

export const updateAttendances = async ({
  params,
  body,
}: TUpdateAttendancesMaterials): Promise<TUpdateAttendancesResponse> => {
  const response = await ApiService.post(`/v1/api/admin/attendances/players`, body, { params });
  return response.data;
};
