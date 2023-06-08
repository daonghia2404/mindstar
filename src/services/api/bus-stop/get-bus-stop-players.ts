import { TBusStopPlayer } from '@/common/models';
import { TCommonPaginate, TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetBusStopPlayersPaths = {
  id: string | number;
};
export type TGetBusStopPlayersParams = {
  page: number;
  size: number;
  sort?: string;
};

export type TGetBusStopPlayersMaterials = {
  paths?: TGetBusStopPlayersPaths;
  params?: TGetBusStopPlayersParams;
};

export type TGetBusStopPlayersResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TBusStopPlayer[];
  };
};

// FUNCTION

export const getBusStopPlayers = async ({
  paths,
  params,
}: TGetBusStopPlayersMaterials): Promise<TGetBusStopPlayersResponse> => {
  const response = await ApiService.get(`/v1/api/admin/bus-stops/${paths?.id}/players`, { params });
  return response.data;
};
