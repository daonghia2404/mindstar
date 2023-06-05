import { TUser } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetChildPlayersPaths = {
  id: string | number;
};
export type TGetChildPlayersParams = unknown;

export type TGetChildPlayersMaterials = {
  paths?: TGetChildPlayersPaths;
  params?: TGetChildPlayersParams;
};

export type TGetChildPlayersResponse = TCommonResponse & {
  data: TUser;
};

// FUNCTION

export const getChildPlayers = async ({
  paths,
  params,
}: TGetChildPlayersMaterials): Promise<TGetChildPlayersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/players/${paths?.id}/child-players`, { params });
  return response.data;
};
