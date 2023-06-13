import ApiService from '@/services/api';

// TYPES

export type TUpdateSettingsBody = unknown;

export type TUpdateSettingsMaterials = {
  body?: TUpdateSettingsBody;
};

export type TUpdateSettingsResponse = unknown;

// FUNCTION

export const updateSettings = async ({ body }: TUpdateSettingsMaterials): Promise<TUpdateSettingsResponse> => {
  const response = await ApiService.put(`/v1/api/admin/settings`, body);
  return response.data;
};
