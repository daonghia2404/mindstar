import ApiService from '@/services/api';

// TYPES

export type TUpdateClassPaths = {
  id: string | number;
};
export type TUpdateClassBody = unknown;

export type TUpdateClassMaterials = {
  paths?: TUpdateClassPaths;
  body?: TUpdateClassBody;
};

export type TUpdateClassResponse = unknown;

// FUNCTION

export const updateClass = async ({ paths, body }: TUpdateClassMaterials): Promise<TUpdateClassResponse> => {
  const response = await ApiService.put(`/v1/api/admin/classes/${paths?.id}`, body);
  return response.data;
};
