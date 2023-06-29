import ApiService from '@/services/api';

// TYPES

export type TCreateInventoryHistoryExpensePaths = {
  id: string | number;
};
export type TCreateInventoryHistoryExpenseParams = unknown;
export type TCreateInventoryHistoryExpenseBody = unknown;

export type TCreateInventoryHistoryExpenseMaterials = {
  paths?: TCreateInventoryHistoryExpensePaths;
  params?: TCreateInventoryHistoryExpenseParams;
  body?: TCreateInventoryHistoryExpenseBody;
};

export type TCreateInventoryHistoryExpenseResponse = unknown;

// FUNCTION

export const createInventoryHistoryExpense = async ({
  paths,
  params,
  body,
}: TCreateInventoryHistoryExpenseMaterials): Promise<TCreateInventoryHistoryExpenseResponse> => {
  const response = await ApiService.post(`/v1/api/admin/inventories/${paths?.id}/expenses`, body, { params });
  return response.data;
};
