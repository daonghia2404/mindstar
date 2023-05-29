import ApiService from '@/services/api';

// TYPES

export type TResetPasswordBody = unknown;

export type TResetPasswordMaterials = {
  body?: TResetPasswordBody;
};

export type TResetPasswordResponse = unknown;

// FUNCTION

export const resetPassword = async ({ body }: TResetPasswordMaterials): Promise<TResetPasswordResponse> => {
  const response = await ApiService.put(`/v1/api/admin/users/reset-password`, body);
  return response.data;
};
