import ApiService from '@/services/api';

// TYPES

export type TUpdateEventPaths = {
  id: string | number;
};
export type TUpdateEventBody = unknown;

export type TUpdateEventMaterials = {
  paths?: TUpdateEventPaths;
  body?: TUpdateEventBody;
};

export type TUpdateEventResponse = unknown;

// FUNCTION

export const updateEvent = async ({ paths, body }: TUpdateEventMaterials): Promise<TUpdateEventResponse> => {
  const response = await ApiService.put(`/v1/api/admin/events/${paths?.id}`, body);
  return response.data;
};
