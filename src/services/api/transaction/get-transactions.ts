import { TTransaction } from '@/common/models';
import { TCommonPaginate, TCommonResponse, THeaderBranchIds } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetTransactionsParams = {
  page: number;
  size: number;
  fromDate?: number;
  toDate?: number;
  name?: string;
  sort?: string;
  transactionDetailType?: string;
  paymentTypes?: string;
  playerIds?: string;
};

export type TGetTransactionsMaterials = {
  useAdmin?: boolean;
  params?: TGetTransactionsParams;
  headers?: THeaderBranchIds;
};

export type TGetTransactionsResponse = TCommonResponse & {
  data: TCommonPaginate & {
    content: TTransaction[];
    sub_total: number;
  };
};

// FUNCTION

export const getTransactions = async ({
  useAdmin = true,
  params,
  headers,
}: TGetTransactionsMaterials): Promise<TGetTransactionsResponse> => {
  const response = await ApiService.get(`/v1/api${useAdmin ? '/admin' : ''}/transactions`, { params, headers });
  return response.data;
};
