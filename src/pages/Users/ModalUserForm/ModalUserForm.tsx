import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  ECreateUserAction,
  EGetBranchesAction,
  EUpdateUserAction,
  EUploadAvatarUserAction,
  createUserAction,
  getBranchesAction,
  updateUserAction,
  uploadAvatarUserAction,
} from '@/redux/actions';
import {
  copyText,
  generateInitialPassword,
  getFullUrlStatics,
  showNotification,
  validationRules,
} from '@/utils/functions';
import { EAuditingStatus, ETypeNotification, EUserType } from '@/common/enums';
import DatePicker from '@/components/DatePicker';
import { dataUserTypeOptions } from '@/common/constants';
import { useOptionsPaginate } from '@/utils/hooks';
import { TUser } from '@/common/models';
import UploadImage from '@/components/UploadImage';
import Tooltip from '@/components/Tooltip';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Switch from '@/components/Switch';

import { TModalUserFormProps } from './ModalUserForm.type';
import './ModalUserForm.scss';

const ModalUserForm: React.FC<TModalUserFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const [formValues, setFormValues] = useState<any>({});

  const {
    options: optionsBranches,
    handleLoadMore: handleLoadMoreBranches,
    handleSearch: handleSearchBranches,
  } = useOptionsPaginate(
    getBranchesAction,
    'branchReducer',
    'getBranchesResponse',
    EGetBranchesAction.GET_BRANCHES,
    'branchName',
    undefined,
    undefined,
    visible,
  );

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const createUserLoading = useSelector((state: TRootState) => state.loadingReducer[ECreateUserAction.CREATE_USER]);
  const updateUserLoading = useSelector((state: TRootState) => state.loadingReducer[EUpdateUserAction.UPDATE_USER]);
  const uploadAvatarUserLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUploadAvatarUserAction.UPLOAD_AVATAR_USER],
  );
  const loading = createUserLoading || updateUserLoading || uploadAvatarUserLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        academy_id: 1,
        address: values?.address,
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        city_id: values?.city?.value,
        date_of_birth: values?.dateOfBirth?.valueOf(),
        mobile: values?.phoneNumber,
        name: values?.name,
        raw_password: values?.password,
        user_name: values?.loginId,
        user_type: values?.role?.value,
        auditing_status: !data || values?.status ? EAuditingStatus.ACTIVE : EAuditingStatus.INACTIVE,
      };

      if (data) {
        dispatch(
          updateUserAction.request({ body, paths: { id: data?.id } }, (response): void =>
            handleUploadAvatar(response.data, values),
          ),
        );
      } else {
        dispatch(createUserAction.request({ body }, (response): void => handleUploadAvatar(response.data, values)));
      }
    });
  };

  const handleUploadAvatar = (response: TUser, values: any): void => {
    const isUploadAvatar = values?.avatar && values?.avatar !== getFullUrlStatics(data?.avatar);
    if (!isUploadAvatar) handleSubmitSuccess();
    else {
      const formData = new FormData();
      formData.append('file', values?.avatar);
      dispatch(
        uploadAvatarUserAction.request(
          { body: formData, paths: { id: response?.user?.id || '', userType: EUserType.USER } },
          handleSubmitSuccess,
        ),
      );
    }
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Người Dùng Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue({
          avatar: data?.avatar ? getFullUrlStatics(data.avatar) : undefined,
          address: data?.address,
          branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
          city: cityOptions?.find((item) => item.value === data.city.id),
          dateOfBirth: data?.date_of_birth ? moment(data?.date_of_birth) : undefined,
          phoneNumber: data?.mobile,
          name: data?.name,
          role: dataUserTypeOptions.find((item) => item.value === data.user_type),
          status: Boolean(data?.auditing_status),
        });
      } else {
        form.setFieldsValue({
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
          password: generateInitialPassword(),
        });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalUserForm"
      title={data ? 'Sửa Người Dùng' : 'Tạo mới Người Dùng'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalUserForm-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="avatar">
                <UploadImage label="Ảnh đại diện" active sizeImage={100} center shape="circle" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="dateOfBirth" rules={[validationRules.required()]}>
                <DatePicker label="Ngày sinh" required placeholder="Chọn dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input label="Số điện thoại" required placeholder="Nhập dữ liệu" active numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="city" rules={[validationRules.required()]}>
                <Select label="Thành phố" required options={cityOptions} placeholder="Chọn dữ liệu" active showSearch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address">
                <Input label="Địa chỉ" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            {!data && (
              <>
                <Col span={24}>
                  <Form.Item name="loginId" rules={[validationRules.required()]}>
                    <Input label="Tên đăng nhập" required placeholder="Nhập dữ liệu" active />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="password" rules={[validationRules.required()]}>
                    <Input
                      label="Mật khẩu"
                      required
                      placeholder="Nhập dữ liệu"
                      active
                      suffixIcon={
                        <Tooltip title="Sao chép thành công" trigger={['click']} placement="right">
                          <Icon
                            className="cursor-pointer"
                            name={EIconName.Copy}
                            color={EIconColor.DOVE_GRAY}
                            onClick={(): void => {
                              copyText(formValues?.password);
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={24}>
              <Form.Item name="role" rules={[validationRules.required()]}>
                <Select
                  label="Vai trò"
                  required
                  placeholder="Chọn dữ liệu"
                  active
                  disabled={Boolean(data)}
                  options={dataUserTypeOptions.filter((item) =>
                    [EUserType.ADMIN, EUserType.MANAGER].includes(item.value),
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="branch" rules={[validationRules.required()]}>
                <Select
                  label="Chi nhánh"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  options={optionsBranches}
                  onLoadMore={handleLoadMoreBranches}
                  onSearch={handleSearchBranches}
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

export default ModalUserForm;
