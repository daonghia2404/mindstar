import ApiService from '@/services/api';

// TYPES

export type TCreateSupplierParams = unknown;
export type TCreateSupplierBody = unknown;

export type TCreateSupplierMaterials = {
  params?: TCreateSupplierParams;
  body?: TCreateSupplierBody;
};

export type TCreateSupplierResponse = unknown;

// FUNCTION

export const createSupplier = async ({ params, body }: TCreateSupplierMaterials): Promise<TCreateSupplierResponse> => {
  const response = await ApiService.post(`/v1/api/admin/suppliers`, body, { params });
  return response.data;
};
