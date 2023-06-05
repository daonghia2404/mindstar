import ApiService from '@/services/api';

// TYPES

export type TDeleteSupplierPaths = {
  id: string | number;
};
export type TDeleteSupplierParams = unknown;

export type TDeleteSupplierMaterials = {
  paths?: TDeleteSupplierPaths;
  params?: TDeleteSupplierParams;
};

export type TDeleteSupplierResponse = unknown;

// FUNCTION

export const deleteSupplier = async ({ paths, params }: TDeleteSupplierMaterials): Promise<TDeleteSupplierResponse> => {
  const response = await ApiService.delete(`/v1/api/admin/suppliers/${paths?.id}`, { params });
  return response.data;
};
