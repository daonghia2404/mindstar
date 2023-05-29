import { TClass } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetClassPaths = {
  id: string | number;
};
export type TGetClassParams = unknown;

export type TGetClassMaterials = {
  paths?: TGetClassPaths;
  params?: TGetClassParams;
};

export type TGetClassResponse = TCommonResponse & {
  data: TClass;
};

// FUNCTION

export const getClass = async ({ paths, params }: TGetClassMaterials): Promise<TGetClassResponse> => {
  const response = await ApiService.get(`/v1/api/admin/classes/${paths?.id}`, { params });
  return response.data;
};
