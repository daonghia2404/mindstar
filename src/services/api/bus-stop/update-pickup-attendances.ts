import ApiService from '@/services/api';

// TYPES

export type TUpdatePickupAttendancesParams = unknown;
export type TUpdatePickupAttendancesBody = unknown;

export type TUpdatePickupAttendancesMaterials = {
  params?: TUpdatePickupAttendancesParams;
  body?: TUpdatePickupAttendancesBody;
};

export type TUpdatePickupAttendancesResponse = unknown;

// FUNCTION

export const updatePickupAttendances = async ({
  params,
  body,
}: TUpdatePickupAttendancesMaterials): Promise<TUpdatePickupAttendancesResponse> => {
  const response = await ApiService.post(`/v1/api/pickup-attendances`, body, { params });
  return response.data;
};
