import ApiService from '@/services/api';

// TYPES

export type TUpdateManagerPaths = {
  id: string | number;
};
export type TUpdateManagerBody = unknown;

export type TUpdateManagerMaterials = {
  paths?: TUpdateManagerPaths;
  body?: TUpdateManagerBody;
};

export type TUpdateManagerResponse = unknown;

// FUNCTION

export const updateManager = async ({ paths, body }: TUpdateManagerMaterials): Promise<TUpdateManagerResponse> => {
  const response = await ApiService.put(`/v1/api/admin/managers/${paths?.id}`, body);
  return response.data;
};
