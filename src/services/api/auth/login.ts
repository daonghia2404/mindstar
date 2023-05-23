import qs from 'qs';

import ApiService from '@/services/api';

// TYPES

export type TLoginParams = unknown;
export type TLoginBody = unknown;

export type TLoginMaterials = {
  params?: TLoginParams;
  body?: TLoginBody;
};

export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
};

// FUNCTION

export const login = async ({ params, body }: TLoginMaterials): Promise<TLoginResponse> => {
  const response = await ApiService.post(`/oauth/token`, qs.stringify(body), {
    params,
  });
  return response.data;
};
