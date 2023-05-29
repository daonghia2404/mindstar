import ApiService from '@/services/api';

// TYPES

export type TDeleteClassPaths = {
  id: string | number;
};
export type TDeleteClassParams = unknown;

export type TDeleteClassMaterials = {
  paths?: TDeleteClassPaths;
  params?: TDeleteClassParams;
};

export type TDeleteClassResponse = unknown;

// FUNCTION

export const deleteClass = async ({ paths, params }: TDeleteClassMaterials): Promise<TDeleteClassResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/classes/${paths?.id}`, { params });
  return response.data;
};
