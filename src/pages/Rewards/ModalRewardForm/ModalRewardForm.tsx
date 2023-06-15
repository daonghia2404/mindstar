import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import {
  ECreateRewardAction,
  EDeleteUploadImagesProductsAction,
  EUpdateRewardAction,
  EUploadImagesProductAction,
  createRewardAction,
  deleteUploadImagesProductsAction,
  getRewardAction,
  updateRewardAction,
  uploadImagesProductAction,
} from '@/redux/actions';
import { renderEachFirstLetterOfWord, showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification, ETypeProductUploadImages } from '@/common/enums';
import TextArea from '@/components/TextArea';
import DatePicker from '@/components/DatePicker';
import UploadImages, { TUploadImages } from '@/components/UploadImages';
import { TReward } from '@/common/models';
import Switch from '@/components/Switch';

import { TModalRewardFormProps } from './ModalRewardForm.type';
import './ModalRewardForm.scss';

const ModalRewardForm: React.FC<TModalRewardFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const rewardState = useSelector((state: TRootState) => state.rewardReducer.getRewardResponse)?.data;

  const createRewardLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateRewardAction.CREATE_REWARD],
  );
  const updateRewardLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateRewardAction.UPDATE_REWARD],
  );
  const uploadImagesProductLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT],
  );
  const deleteUploadImagesProduct = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteUploadImagesProductsAction.DELETE_UPLOAD_IMAGES_PRODUCTS],
  );
  const loading = createRewardLoading || updateRewardLoading || uploadImagesProductLoading || deleteUploadImagesProduct;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        code: values?.code,
        description: values?.description,
        expired_date_time: values?.expireDate?.valueOf(),
        name: values?.name,
        point_value: values?.point,
        auditing_status: !data || values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
      };

      if (data) {
        dispatch(
          updateRewardAction.request({ body, paths: { id: data?.id } }, (response): void =>
            handleUploadImages(response?.data, values?.images),
          ),
        );
      } else {
        dispatch(
          createRewardAction.request({ body }, (response): void => handleUploadImages(response?.data, values?.images)),
        );
      }
    });
  };

  const handleUploadImages = (response: TReward, images: TUploadImages[]): void => {
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
            paths: { id: response.id, productType: ETypeProductUploadImages.REWARDS },
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
              productType: ETypeProductUploadImages.REWARDS,
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
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Phần Thưởng Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data && rewardState) {
        const dataChanged = {
          images: rewardState?.images?.map((item) => ({
            value: item.static_file_id,
            url: item.image,
            fileIndex: item.file_index,
          })),
          name: data?.name,
          code: data?.code,
          description: data?.description,
          point: data?.point_value,
          expireDate: data?.expired_date_time ? moment(data.expired_date_time) : undefined,
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
  }, [visible, form, data, rewardState]);

  const getReward = useCallback(() => {
    if (data?.id && visible) {
      dispatch(getRewardAction.request({ paths: { id: data?.id } }));
    }
  }, [dispatch, visible, data]);

  useEffect(() => {
    getReward();
  }, [getReward]);

  return (
    <Modal
      className="ModalRewardForm"
      title={data ? 'Sửa Phần Thưởng' : 'Tạo mới Phần Thưởng'}
      visible={visible}
      onClose={onClose}
      width={540}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalRewardForm-wrapper">
        <Form form={form} onValuesChange={(value, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="images" rules={[validationRules.required()]}>
                <UploadImages label="Ảnh (Tối đa 5 tấm ảnh)" required />
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
              <Form.Item name="description">
                <TextArea label="Mô tả" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="point" rules={[validationRules.required()]}>
                <Input label="Điểm" required placeholder="Nhập dữ liệu" active useNumber numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="expireDate" rules={[validationRules.required()]}>
                <DatePicker label="Ngày hết hạn" required placeholder="Chọn dữ liệu" active />
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

export default ModalRewardForm;
