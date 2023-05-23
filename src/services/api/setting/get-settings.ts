import { TSetting } from '@/common/models';
import { TCommonResponse } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetSettingsParams = unknown;

export type TGetSettingsMaterials = {
  params?: TGetSettingsParams;
};

export type TGetSettingsResponse = TCommonResponse & {
  data: TSetting;
};

// FUNCTION

export const getSettings = async ({ params }: TGetSettingsMaterials): Promise<TGetSettingsResponse> => {
  const response = await ApiService.get(`/v1/api/settings`, { params });
  return response.data;
};
