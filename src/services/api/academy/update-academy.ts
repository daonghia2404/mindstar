import { TAcademy } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TUpdateAcademyPaths = {
  id: string | number;
};
export type TUpdateAcademyBody = unknown;

export type TUpdateAcademyMaterials = {
  paths?: TUpdateAcademyPaths;
  body?: TUpdateAcademyBody;
};

export type TUpdateAcademyResponse = TCommonResponse & {
  data: TAcademy;
};

// FUNCTION

export const updateAcademy = async ({ paths, body }: TUpdateAcademyMaterials): Promise<TUpdateAcademyResponse> => {
  const response = await ApiService.put(`/v1/api/admin/academies/${paths?.id}`, body);
  return response.data;
};
