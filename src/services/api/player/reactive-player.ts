import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TReactivePlayerPaths = {
  id: string | number;
};
export type TReactivePlayerBody = unknown;

export type TReactivePlayerMaterials = {
  paths?: TReactivePlayerPaths;
  body?: TReactivePlayerBody;
};

export type TReactivePlayerResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const reactivePlayer = async ({ paths, body }: TReactivePlayerMaterials): Promise<TReactivePlayerResponse> => {
  const response = await ApiService.put(`/v1/api/players/${paths?.id}/reactive`, body);
  return response.data;
};
