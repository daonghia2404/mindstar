import ApiService from '@/services/api';

// TYPES

export type TCreateTransactionParams = unknown;
export type TCreateTransactionBody = unknown;

export type TCreateTransactionMaterials = {
  params?: TCreateTransactionParams;
  body?: TCreateTransactionBody;
};

export type TCreateTransactionResponse = unknown;

// FUNCTION

export const createTransaction = async ({
  params,
  body,
}: TCreateTransactionMaterials): Promise<TCreateTransactionResponse> => {
  const response = await ApiService.post(`/v1/api/admin/transactions`, body, { params });
  return response.data;
};
