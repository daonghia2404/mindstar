import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  EUpdateAcademyAction,
  EUploadImagesProductAction,
  updateAcademyAction,
  uploadImagesProductAction,
} from '@/redux/actions';
import { getFullUrlStatics, showNotification, validationRules } from '@/utils/functions';
import { ETypeImageAcademy, ETypeNotification, ETypeProductUploadImages } from '@/common/enums';
import { dataAcademySizeOptions } from '@/common/constants';
import TextArea from '@/components/TextArea';
import UploadImage from '@/components/UploadImage';
import { TAcademy } from '@/common/models';

import { TModalAcademyFormProps } from './ModalAcademyForm.type';
import './ModalAcademyForm.scss';

const ModalAcademyForm: React.FC<TModalAcademyFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const updateAcademyLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateAcademyAction.UPDATE_ACADEMY],
  );
  const uploadImagesProductLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUploadImagesProductAction.UPLOAD_IMAGES_PRODUCT],
  );
  const loading = updateAcademyLoading || uploadImagesProductLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        account_name: values?.accountName,
        account_number: values?.accountNumber,
        address: values?.address,
        bank_name: values?.bankName,
        city_id: values?.city?.value,
        director: values?.director,
        name: values?.name,
        primary_contact: values?.phoneNumber,
        size: values?.size?.value,
      };

      if (data) {
        dispatch(
          updateAcademyAction.request({ body, paths: { id: data?.id } }, (response): void =>
            handleUploadImages(response?.data, values),
          ),
        );
      }
    });
  };

  const handleUploadImages = (response: TAcademy, values: any): void => {
    const isUploadLogo = values?.logo !== getFullUrlStatics(data?.logo);
    const isUploadQrCode = values?.qrCode !== getFullUrlStatics(data?.qr_code);

    if (!isUploadLogo && !isUploadQrCode) {
      handleSubmitSuccess();
    }

    const uploadLogoFunc = (callSuccess?: boolean): void => {
      const body = new FormData();
      body.append('file', values.logo);
      body.append('imageType', ETypeImageAcademy.LOGO);
      dispatch(
        uploadImagesProductAction.request(
          {
            body,
            paths: { id: response.id, productType: ETypeProductUploadImages.ACADEMIES },
          },
          (): void => {
            if (callSuccess || !isUploadQrCode) handleSubmitSuccess();
            else uploadQrCodeFunc(true);
          },
        ),
      );
    };

    const uploadQrCodeFunc = (callSuccess?: boolean): void => {
      const body = new FormData();
      body.append('file', values.qrCode);
      body.append('imageType', ETypeImageAcademy.QR_CODE);
      dispatch(
        uploadImagesProductAction.request(
          {
            body,
            paths: { id: response.id, productType: ETypeProductUploadImages.ACADEMIES },
          },
          (): void => {
            if (callSuccess || !isUploadLogo) handleSubmitSuccess();
            else uploadLogoFunc(true);
          },
        ),
      );
    };

    if (isUploadLogo) {
      uploadLogoFunc();
    } else if (isUploadQrCode) {
      uploadQrCodeFunc();
    }
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Trung Tâm Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue({
          logo: data?.logo ? getFullUrlStatics(data.logo) : undefined,
          qrCode: data?.qr_code ? getFullUrlStatics(data.qr_code) : undefined,
          accountName: data?.account_name,
          accountNumber: data?.account_number,
          address: data?.address,
          bankName: data?.bank_name,
          city: cityOptions?.find((item) => item.value === data.city.id),
          director: data?.director,
          name: data?.name,
          phoneNumber: data?.primary_contact,
          size: dataAcademySizeOptions.find((item) => item.value === data?.size),
        });
      } else {
        form.setFieldsValue({});
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalAcademyForm"
      title={data ? 'Sửa Trung Tâm' : 'Tạo mới Trung Tâm'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalAcademyForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="logo" rules={[validationRules.required()]}>
                <UploadImage label="Logo" required defaultImage active autoSize objectFitContain />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Tên trung tâm" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="director" rules={[validationRules.required()]}>
                <Input label="Người điều hành" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="size" rules={[validationRules.required()]}>
                <Select label="Số lượng" required placeholder="Chọn dữ liệu" active options={dataAcademySizeOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="city" rules={[validationRules.required()]}>
                <Select label="Thành phố" options={cityOptions} required placeholder="Chọn dữ liệu" active showSearch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" rules={[validationRules.required()]}>
                <TextArea label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input label="Số điện thoại" required placeholder="Nhập dữ liệu" active numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="accountName" rules={[validationRules.required()]}>
                <Input label="Tên tài khoản" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="accountNumber" rules={[validationRules.required()]}>
                <Input label="Số tài khoản" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="bankName" rules={[validationRules.required()]}>
                <Input label="Tên ngân hàng" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="qrCode">
                <UploadImage label="QR code" defaultImage active sizeImage={120} objectFitContain />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalAcademyForm;
