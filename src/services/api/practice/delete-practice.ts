import ApiService from '@/services/api';

// TYPES

export type TDeletePracticePaths = {
  id: string | number;
};
export type TDeletePracticeParams = unknown;

export type TDeletePracticeMaterials = {
  paths?: TDeletePracticePaths;
  params?: TDeletePracticeParams;
};

export type TDeletePracticeResponse = unknown;

// FUNCTION

export const deletePractice = async ({ paths, params }: TDeletePracticeMaterials): Promise<TDeletePracticeResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/practices/${paths?.id}`, { params });
  return response.data;
};
