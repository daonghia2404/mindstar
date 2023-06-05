import { TAcademy } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetMyAcademyParams = unknown;

export type TGetMyAcademyMaterials = {
  params?: TGetMyAcademyParams;
};

export type TGetMyAcademyResponse = TCommonResponse & {
  data: TAcademy;
};

// FUNCTION

export const getMyAcademy = async ({ params }: TGetMyAcademyMaterials): Promise<TGetMyAcademyResponse> => {
  const response = await ApiService.get(`/v1/api/admin/academies/my-academy`, { params });
  return response.data;
};
