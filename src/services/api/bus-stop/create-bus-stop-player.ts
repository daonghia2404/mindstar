import ApiService from '@/services/api';

// TYPES

export type TCreateBusStopPlayerParams = unknown;
export type TCreateBusStopPlayerBody = unknown;

export type TCreateBusStopPlayerMaterials = {
  params?: TCreateBusStopPlayerParams;
  body?: TCreateBusStopPlayerBody;
};

export type TCreateBusStopPlayerResponse = unknown;

// FUNCTION

export const createBusStopPlayer = async ({
  params,
  body,
}: TCreateBusStopPlayerMaterials): Promise<TCreateBusStopPlayerResponse> => {
  const response = await ApiService.post(`/v1/api/admin/player-bus-stops`, body, { params });
  return response.data;
};
