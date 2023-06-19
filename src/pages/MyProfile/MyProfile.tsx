import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Card from '@/components/Card';
import Select from '@/components/Select';
import Input from '@/components/Input';
import { getFullUrlStatics, showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  EUpdateUserAction,
  EUploadAvatarUserAction,
  getMyProfileAction,
  updateUserAction,
  uploadAvatarUserAction,
} from '@/redux/actions';
import { ETypeNotification, EUserType } from '@/common/enums';
import { Paths } from '@/pages/routers';
import UploadImage from '@/components/UploadImage';
import { TUser } from '@/common/models';

import './MyProfile.scss';

const MyProfile: React.FC = () => {
  const dispatch = useDispatch();

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;

  const uploadAvatarUserLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUploadAvatarUserAction.UPLOAD_AVATAR_USER],
  );
  const updateUserLoading = useSelector((state: TRootState) => state.loadingReducer[EUpdateUserAction.UPDATE_USER]);
  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const loading = uploadAvatarUserLoading || updateUserLoading;

  const [form] = Form.useForm();

  const handleBack = (): void => {
    navigate(Paths.SettingsGeneral);
  };

  const handleSubmit = (values: any): void => {
    const body = {
      address: values?.address,
      city_id: values?.city?.value,
      full_name: values?.name,
      mobile: values?.phoneNumber,
    };

    dispatch(
      updateUserAction.request({ useAdmin: false, body, paths: { id: myProfileState?.id || '' } }, (response): void =>
        handleUploadAvatar(response.data, values),
      ),
    );
  };

  const handleUploadAvatar = (response: TUser, values: any): void => {
    const isUploadAvatar = values?.avatar && values?.avatar !== getFullUrlStatics(myProfileState?.avatar);
    if (!isUploadAvatar) handleSubmitSuccess();
    else {
      const formData = new FormData();
      formData.append('file', values?.avatar);
      dispatch(
        uploadAvatarUserAction.request(
          { body: formData, paths: { id: response?.id || '', userType: EUserType.USER } },
          handleSubmitSuccess,
        ),
      );
    }
  };

  const handleSubmitSuccess = (): void => {
    getMyProfile();
    showNotification(ETypeNotification.SUCCESS, 'Cập Nhật Thông Tin Cá Nhân Thành Công !');
  };

  const getMyProfile = (): void => {
    dispatch(getMyProfileAction.request({}));
  };

  useEffect(() => {
    if (myProfileState) {
      form.setFieldsValue({
        avatar: myProfileState?.avatar ? getFullUrlStatics(myProfileState.avatar) : undefined,
        name: myProfileState?.name,
        phoneNumber: myProfileState?.mobile,
        city: cityOptions?.find((item) => item.value === myProfileState?.city?.id),
        address: myProfileState?.address,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, myProfileState]);

  return (
    <Form form={form} className="MyProfile" onFinish={handleSubmit}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <div className="Admin-back" onClick={handleBack}>
                <Icon name={EIconName.ArrowLongLeft} color={EIconColor.DOVE_GRAY} />
                Quay lại
              </div>
            </Col>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button
                    title="Lưu"
                    htmlType="submit"
                    styleType={EButtonStyleType.PURPLE}
                    iconName={EIconName.DeviceFloppy}
                    iconColor={EIconColor.WHITE}
                    disabled={loading}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Card title="Thông tin cá nhân">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item name="avatar" rules={[validationRules.required()]}>
                  <UploadImage label="Ảnh đại diện" active sizeImage={100} center shape="circle" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="name" rules={[validationRules.required()]}>
                  <Input label="Họ và Tên" required active placeholder="Nhập dữ liệu" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                  <Input label="Số điện thoại" required placeholder="Nhập dữ liệu" active numberic />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="city" rules={[validationRules.required()]}>
                  <Select
                    label="Thành phố"
                    options={cityOptions}
                    required
                    placeholder="Chọn dữ liệu"
                    active
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="address" rules={[validationRules.required()]}>
                  <Input label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default MyProfile;
