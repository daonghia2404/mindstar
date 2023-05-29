import ApiService from '@/services/api';

// TYPES

export type TDeleteTimeOffPaths = {
  id: string | number;
};
export type TDeleteTimeOffParams = unknown;

export type TDeleteTimeOffMaterials = {
  paths?: TDeleteTimeOffPaths;
  params?: TDeleteTimeOffParams;
};

export type TDeleteTimeOffResponse = unknown;

// FUNCTION

export const deleteTimeOff = async ({ paths, params }: TDeleteTimeOffMaterials): Promise<TDeleteTimeOffResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/time-off/${paths?.id}`, { params });
  return response.data;
};
