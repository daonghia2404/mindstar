import ApiService from '@/services/api';

// TYPES

export type TDeleteManagerPaths = {
  id: string | number;
};
export type TDeleteManagerParams = unknown;

export type TDeleteManagerMaterials = {
  paths?: TDeleteManagerPaths;
  params?: TDeleteManagerParams;
};

export type TDeleteManagerResponse = unknown;

// FUNCTION

export const deleteManager = async ({ paths, params }: TDeleteManagerMaterials): Promise<TDeleteManagerResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/managers/${paths?.id}`, { params });
  return response.data;
};
