import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select, { TSelectOption } from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  ECreateManagerAction,
  EGetClassesAction,
  EUpdateManagerAction,
  EUploadAvatarUserAction,
  createManagerAction,
  getClassesAction,
  updateManagerAction,
  uploadAvatarUserAction,
} from '@/redux/actions';
import { getFullUrlStatics, showNotification, validationRules } from '@/utils/functions';
import { ETypeNotification, EUserType } from '@/common/enums';
import DatePicker from '@/components/DatePicker';
import { dataDegreeTypeOptions, dataSalaryTypeOptions } from '@/common/constants';
import TextArea from '@/components/TextArea';
import MultipleSelect from '@/components/MultipleSelect';
import { useOptionsPaginate } from '@/utils/hooks';
import { TUser } from '@/common/models';
import UploadImage from '@/components/UploadImage';

import { TModalManagerFormProps } from './ModalManagerForm.type';
import './ModalManagerForm.scss';

const ModalManagerForm: React.FC<TModalManagerFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const {
    options: optionsClasses,
    handleLoadMore: handleLoadMoreClasses,
    handleSearch: handleSearchClasses,
  } = useOptionsPaginate(
    getClassesAction,
    'classReducer',
    'getClassesResponse',
    EGetClassesAction.GET_CLASSES,
    undefined,
    undefined,
    undefined,
    visible,
  );

  // const {
  //   options: optionsBranches,
  //   handleLoadMore: handleLoadMoreBranches,
  //   handleSearch: handleSearchBranches,
  // } = useOptionsPaginate(getBranchesAction, 'branchReducer', 'getBranchesResponse', EGetBranchesAction.GET_BRANCHES, 'branchName', undefined, undefined, visible);

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));

  const createManagerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateManagerAction.CREATE_MANAGER],
  );
  const updateManagerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateManagerAction.UPDATE_MANAGER],
  );
  const uploadAvatarUserLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUploadAvatarUserAction.UPLOAD_AVATAR_USER],
  );
  const loading = createManagerLoading || updateManagerLoading || uploadAvatarUserLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        date_of_birth: values?.dateOfBirth?.valueOf(),
        mobile: values?.phoneNumber,
        degree_type: values?.degreeType?.value,
        salary_type: values?.salaryType?.value,
        salary: values?.salary,
        class_ids: values?.classes?.map((item: TSelectOption) => Number(item.value)),
        address: values?.address,
        city_id: values?.city?.value,
        note: values?.note,
        // branch_id: values?.branches?.map((item: TSelectOption) => Number(item.value)),

        user_type: EUserType.TEACHER,
        academy_id: 1,
      };

      if (data) {
        dispatch(
          updateManagerAction.request({ body, paths: { id: data?.id } }, (response): void =>
            handleUploadAvatar(response.data, values),
          ),
        );
      } else {
        dispatch(createManagerAction.request({ body }, (response): void => handleUploadAvatar(response.data, values)));
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
          { body: formData, paths: { id: response?.id || '', userType: EUserType.MANAGER } },
          handleSubmitSuccess,
        ),
      );
    }
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Giáo Viên Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue({
          avatar: data?.avatar ? getFullUrlStatics(data.avatar) : undefined,
          name: data?.name,
          dateOfBirth: data?.date_of_birth ? moment(data?.date_of_birth) : undefined,
          phoneNumber: data?.mobile,
          degreeType: dataDegreeTypeOptions.find((item) => String(item.value) === String(data?.degree_type)),
          salaryType: dataSalaryTypeOptions.find((item) => item.value === data?.salary_type),
          salary: Number(data?.salary),
          classes: data?.classes?.map((item) => ({ label: item.name, value: String(item.id) })),
          address: data?.address,
          city: cityOptions?.find((item) => item.value === data?.city?.id),
          note: data?.note,
          // branches: [],
        });
      } else {
        form.setFieldsValue({
          branches: currentBranch?.id ? [{ label: currentBranch?.name, value: String(currentBranch?.id) }] : undefined,
        });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalManagerForm"
      title={data ? 'Sửa Giáo Viên' : 'Tạo mới Giáo Viên'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalManagerForm-wrapper">
        <Form form={form}>
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
            {/* <Col span={24}>
              <Form.Item name="branches" rules={[validationRules.required()]}>
                <MultipleSelect
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
            </Col> */}
            <Col span={24}>
              <Form.Item name="degreeType" rules={[validationRules.required()]}>
                <Select label="Trình độ" required placeholder="Chọn dữ liệu" active options={dataDegreeTypeOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="salaryType" rules={[validationRules.required()]}>
                <Select
                  label="Chế độ lương"
                  required
                  placeholder="Chọn dữ liệu"
                  active
                  options={dataSalaryTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="salary" rules={[validationRules.required()]}>
                <Input
                  label="Lương Cơ Bản"
                  required
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  useNumber
                  useComma
                  suffixText="đ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="classes">
                <MultipleSelect
                  label="Lớp học"
                  placeholder="Chọn dữ liệu"
                  active
                  showSearch
                  options={optionsClasses}
                  onLoadMore={handleLoadMoreClasses}
                  onSearch={handleSearchClasses}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address">
                <Input label="Địa chỉ" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="city">
                <Select label="Thành phố" options={cityOptions} placeholder="Chọn dữ liệu" active showSearch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalManagerForm;
