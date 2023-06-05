import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TCreateManagerParams = unknown;
export type TCreateManagerBody = unknown;

export type TCreateManagerMaterials = {
  params?: TCreateManagerParams;
  body?: TCreateManagerBody;
};

export type TCreateManagerResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const createManager = async ({ params, body }: TCreateManagerMaterials): Promise<TCreateManagerResponse> => {
  const response = await ApiService.post(`/v1/api/admin/managers`, body, { params });
  return response.data;
};
