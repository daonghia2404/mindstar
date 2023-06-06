import ApiService from '@/services/api';

// TYPES

export type TUpdateTransactionPaths = {
  id: string | number;
};
export type TUpdateTransactionBody = unknown;

export type TUpdateTransactionMaterials = {
  paths?: TUpdateTransactionPaths;
  body?: TUpdateTransactionBody;
};

export type TUpdateTransactionResponse = unknown;

// FUNCTION

export const updateTransaction = async ({
  paths,
  body,
}: TUpdateTransactionMaterials): Promise<TUpdateTransactionResponse> => {
  const response = await ApiService.put(`/v1/api/admin/transactions/${paths?.id}`, body);
  return response.data;
};
