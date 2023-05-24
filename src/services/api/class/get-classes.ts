import { TClass } from '@/common/models';
import { TCommonPaginate, TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetClassesParams = unknown;

export type TGetClassesMaterials = {
  params?: TGetClassesParams;
};

export type TGetClassesResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TClass[];
  };
};

// FUNCTION

export const getClasses = async ({ params }: TGetClassesMaterials): Promise<TGetClassesResponse> => {
  const response = await ApiService.get(`/v1/api/admin/classes`, { params });
  return response.data;
};
