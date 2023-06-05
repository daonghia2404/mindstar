import ApiService from '@/services/api';

// TYPES

export type TUpdateSupplierPaths = {
  id: string | number;
};
export type TUpdateSupplierBody = unknown;

export type TUpdateSupplierMaterials = {
  paths?: TUpdateSupplierPaths;
  body?: TUpdateSupplierBody;
};

export type TUpdateSupplierResponse = unknown;

// FUNCTION

export const updateSupplier = async ({ paths, body }: TUpdateSupplierMaterials): Promise<TUpdateSupplierResponse> => {
  const response = await ApiService.put(`/v1/api/admin/suppliers/${paths?.id}`, body);
  return response.data;
};
