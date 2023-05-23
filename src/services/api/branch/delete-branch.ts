import ApiService from '@/services/api';

// TYPES

export type TDeleteBranchPaths = {
  id: string | number;
};
export type TDeleteBranchParams = unknown;

export type TDeleteBranchMaterials = {
  paths?: TDeleteBranchPaths;
  params?: TDeleteBranchParams;
};

export type TDeleteBranchResponse = unknown;

// FUNCTION

export const deleteBranch = async ({ paths, params }: TDeleteBranchMaterials): Promise<TDeleteBranchResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/branches/${paths?.id}`, { params });
  return response.data;
};
