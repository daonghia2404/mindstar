import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetManagerPaths = {
  id: string | number;
};
export type TGetManagerParams = unknown;

export type TGetManagerMaterials = {
  paths?: TGetManagerPaths;
  params?: TGetManagerParams;
};

export type TGetManagerResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const getManager = async ({ paths, params }: TGetManagerMaterials): Promise<TGetManagerResponse> => {
  const response = await ApiService.get(`/v1/api/admin/managers/${paths?.id}`, { params });
  return response.data;
};
