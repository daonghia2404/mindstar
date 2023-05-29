import ApiService from '@/services/api';

// TYPES

export type TCreateEventParams = unknown;
export type TCreateEventBody = unknown;

export type TCreateEventMaterials = {
  params?: TCreateEventParams;
  body?: TCreateEventBody;
};

export type TCreateEventResponse = unknown;

// FUNCTION

export const createEvent = async ({ params, body }: TCreateEventMaterials): Promise<TCreateEventResponse> => {
  const response = await ApiService.post(`/v1/api/admin/events`, body, { params });
  return response.data;
};
