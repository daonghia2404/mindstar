import ApiService from '@/services/api';

// TYPES

export type TCreateBusStopParams = unknown;
export type TCreateBusStopBody = unknown;

export type TCreateBusStopMaterials = {
  params?: TCreateBusStopParams;
  body?: TCreateBusStopBody;
};

export type TCreateBusStopResponse = unknown;

// FUNCTION

export const createBusStop = async ({ params, body }: TCreateBusStopMaterials): Promise<TCreateBusStopResponse> => {
  const response = await ApiService.post(`/v1/api/admin/bus-stops`, body, { params });
  return response.data;
};
