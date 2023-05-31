import ApiService from '@/services/api';

// TYPES

export type TUpdatePracticePaths = {
  id: string | number;
};
export type TUpdatePracticeBody = unknown;

export type TUpdatePracticeMaterials = {
  paths?: TUpdatePracticePaths;
  body?: TUpdatePracticeBody;
};

export type TUpdatePracticeResponse = unknown;

// FUNCTION

export const updatePractice = async ({ paths, body }: TUpdatePracticeMaterials): Promise<TUpdatePracticeResponse> => {
  const response = await ApiService.put(`/v1/api/admin/practices/${paths?.id}`, body);
  return response.data;
};
