import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TCreatePlayerParams = unknown;
export type TCreatePlayerBody = unknown;

export type TCreatePlayerMaterials = {
  params?: TCreatePlayerParams;
  body?: TCreatePlayerBody;
};

export type TCreatePlayerResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const createPlayer = async ({ params, body }: TCreatePlayerMaterials): Promise<TCreatePlayerResponse> => {
  const response = await ApiService.post(`/v1/api/players`, body, { params });
  return response.data;
};
