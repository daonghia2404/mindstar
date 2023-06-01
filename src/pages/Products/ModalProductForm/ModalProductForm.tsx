import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import {
  ECreateProductAction,
  EUpdateProductAction,
  EUploadImagesProductAction,
  createProductAction,
  getCategoriesAction,
  getProductAction,
  updateProductAction,
  uploadImagesProductAction,
} from '@/redux/actions';
import { renderEachFirstLetterOfWord, showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification, ETypeProductUploadImages } from '@/common/enums';
import TextArea from '@/components/TextArea';
import { TProduct } from '@/common/models';
import UploadImages, { TUploadImages } from '@/components/UploadImages';
import {
  EDeleteUploadImagesProductsAction,
  deleteUploadImagesProductsAction,
} from '@/redux/actions/upload/delete-upload-images-products';
import Switch from '@/components/Switch';
import Select from '@/components/Select';
import { useOptionsPaginate } from '@/utils/hooks';

import { TModalProductFormProps } from './ModalProductForm.type';
import './ModalProductForm.scss';

const ModalShopProducts: React.FC<TModalProductFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const productState = useSelector((state: TRootState) => state.productReducer.getProductResponse)?.data;

  const createProductLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateProductAction.CREATE_PRODUCT],
  );
  const updateProductLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateProductAction.UPDATE_PRODUCT],
  );
  const uploadImagesProductLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT],
  );
  const deleteUploadImagesProduct = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS],
  );
  const loading =
    createProductLoading || updateProductLoading || uploadImagesProductLoading || deleteUploadImagesProduct;

  const {
    options: optionsCategories,
    handleLoadMore: handleLoadMoreCategories,
    handleSearch: handleSearchCategories,
    handleReset: handleResetCategories,
  } = useOptionsPaginate(
    getCategoriesAction,
    'categoryReducer',
    'getCategoriesResponse',
    undefined,
    { auditingStatuses: EAuditingStatus.ACTIVE },
    { branchIds: currentBranchId },
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        code: values?.code,
        description: values?.description,
        name: values?.name,
        category_id: values?.category?.value,
        selling_price: values?.sellingPrice,
        retail_price: values?.retailPrice,
        auditing_status: !data || values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
      };

      if (data) {
        dispatch(
          updateProductAction.request({ body, paths: { id: data?.id } }, (response): void =>
            handleUploadImages(response?.data, values?.images),
          ),
        );
      } else {
        dispatch(
          createProductAction.request({ body }, (response): void => handleUploadImages(response?.data, values?.images)),
        );
      }
    });
  };

  const handleUploadImages = (response: TProduct, images: TUploadImages[]): void => {
    const uploadImages = images?.filter((item) => item.file) || [];
    const deleteImages = images?.filter((item) => item.delete) || [];

    if (uploadImages.length === 0 && deleteImages.length === 0) {
      handleSubmitSuccess();
    }

    const uploadImagesFunc = (callSuccess?: boolean): void => {
      const body = new FormData();
      uploadImages.forEach((item) => body.append('files', item.file));
      body.append('filesIndex', uploadImages.map((item) => item.fileIndex).join(','));
      dispatch(
        uploadImagesProductAction.request(
          {
            body,
            paths: { id: response.id, productType: ETypeProductUploadImages.PRODUCTS },
          },
          (): void => {
            if (callSuccess || deleteImages.length === 0) handleSubmitSuccess();
            else deleteImagesFunc(true);
          },
        ),
      );
    };

    const deleteImagesFunc = (callSuccess?: boolean): void => {
      dispatch(
        deleteUploadImagesProductsAction.request(
          {
            paths: {
              id: response.id,
              productType: ETypeProductUploadImages.PRODUCTS,
              imageIds: deleteImages?.map((item) => item.value)?.join(','),
            },
          },
          (): void => {
            if (callSuccess || uploadImages.length > 0) handleSubmitSuccess();
            else uploadImagesFunc(true);
          },
        ),
      );
    };

    if (uploadImages.length > 0) {
      uploadImagesFunc();
    } else if (deleteImages.length > 0) {
      deleteImagesFunc();
    }
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Sản Phẩm Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      handleResetCategories();

      if (data && productState) {
        const dataChanged = {
          images: productState?.images?.map((item) => ({
            value: item.static_file_id,
            url: item.image,
            fileIndex: item.file_index,
          })),
          name: data?.name,
          code: data?.code,
          sellingPrice: data?.selling_price,
          retailPrice: data?.retail_price,
          description: data?.description,
          category: data?.category ? { label: data?.category?.name, value: String(data?.category?.id) } : undefined,
          status: Boolean(data?.auditing_status),
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else {
        const dataChanged = {
          status: true,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data, productState]);

  const getProduct = useCallback(() => {
    if (data?.id && visible) {
      dispatch(getProductAction.request({ paths: { id: data?.id } }));
    } else {
      dispatch(getProductAction.success(undefined));
    }
  }, [dispatch, visible, data]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <Modal
      className="ModalShopProducts"
      title={data ? 'Sửa Sản Phẩm' : 'Tạo mới Sản Phẩm'}
      visible={visible}
      onClose={onClose}
      width={540}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalShopProducts-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="images" rules={[validationRules.required()]}>
                <UploadImages label="Ảnh" required />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input
                  label="Tên"
                  required
                  placeholder="Nhập dữ liệu"
                  active
                  onBlur={(): void => {
                    if (!formValues.code) {
                      const dataChanged = {
                        code: renderEachFirstLetterOfWord(formValues?.name),
                      };
                      setFormValues({ ...formValues, ...dataChanged });
                      form.setFieldsValue(dataChanged);
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="code" rules={[validationRules.required()]}>
                <Input label="Mã" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="category">
                <Select
                  label="Danh mục"
                  placeholder="Chọn dữ liệu"
                  active
                  showSearch
                  options={optionsCategories}
                  onLoadMore={handleLoadMoreCategories}
                  onSearch={handleSearchCategories}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description">
                <TextArea label="Mô tả" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="retailPrice" rules={[validationRules.required()]}>
                <Input
                  label="Giá niêm yết"
                  placeholder="Nhập dữ liệu"
                  active
                  required
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="sellingPrice" rules={[validationRules.required()]}>
                <Input
                  required
                  label="Giá bán"
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            {data && (
              <Col span={24}>
                <Form.Item name="status">
                  <Switch label="Trạng thái" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalShopProducts;
