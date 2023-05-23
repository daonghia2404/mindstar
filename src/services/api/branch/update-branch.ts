import ApiService from '@/services/api';

// TYPES

export type TUpdateBranchPaths = {
  id: string | number;
};
export type TUpdateBranchBody = unknown;

export type TUpdateBranchMaterials = {
  paths?: TUpdateBranchPaths;
  body?: TUpdateBranchBody;
};

export type TUpdateBranchResponse = unknown;

// FUNCTION

export const updateBranch = async ({ paths, body }: TUpdateBranchMaterials): Promise<TUpdateBranchResponse> => {
  const response = await ApiService.put(`/v1/api/admin/branches/${paths?.id}`, body);
  return response.data;
};
