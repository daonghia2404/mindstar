import ApiService from '@/services/api';

// TYPES

export type TDeleteTransactionPaths = {
  id: string | number;
};
export type TDeleteTransactionParams = unknown;

export type TDeleteTransactionMaterials = {
  paths?: TDeleteTransactionPaths;
  params?: TDeleteTransactionParams;
};

export type TDeleteTransactionResponse = unknown;

// FUNCTION

export const deleteTransaction = async ({
  paths,
  params,
}: TDeleteTransactionMaterials): Promise<TDeleteTransactionResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/transactions/${paths?.id}`, { params });
  return response.data;
};
