import { TSetting } from '@/common/models';
import { TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetSettingsParams = unknown;

export type TGetSettingsMaterials = {
  params?: TGetSettingsParams;
  headers?: THeaderBranchIds;
};

export type TGetSettingsResponse = TCommonResponse & {
  data: TSetting;
};

// FUNCTION

export const getSettings = async ({ params, headers }: TGetSettingsMaterials): Promise<TGetSettingsResponse> => {
  const response = await ApiService.get(`/v1/api/settings`, { params, headers });
  return response.data;
};
