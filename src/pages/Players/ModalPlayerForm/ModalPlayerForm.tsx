import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select, { TSelectOption } from '@/components/Select';
import { TRootState } from '@/redux/reducers';
import {
  ECreatePlayerAction,
  EUpdatePlayerAction,
  createPlayerAction,
  getBranchesAction,
  getClassesAction,
  updatePlayerAction,
} from '@/redux/actions';
import {
  copyText,
  formatCurrency,
  formatISODateToDateTime,
  generateInitialPassword,
  showNotification,
  validationRules,
} from '@/utils/functions';
import { EFormat, ETypeNotification } from '@/common/enums';
import DatePicker from '@/components/DatePicker';
import { dataDayOfWeeksOptions, dataPaymentTypeOptions } from '@/common/constants';
import TextArea from '@/components/TextArea';
import { useOptionsPaginate } from '@/utils/hooks';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Tooltip from '@/components/Tooltip';
import CheckboxGroup from '@/components/CheckboxGroup';
import { TClass } from '@/common/models';

import { TModalPlayerFormProps } from './ModalPlayerForm.type';
import './ModalPlayerForm.scss';

const ModalPlayerForm: React.FC<TModalPlayerFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const {
    options: optionsClasses,
    handleLoadMore: handleLoadMoreClasses,
    handleSearch: handleSearchClasses,
    handleReset: handleResetClasses,
  } = useOptionsPaginate(
    getClassesAction,
    'classReducer',
    'getClassesResponse',
    undefined,
    {},
    { branchIds: formValues?.branch?.value || '' },
  );

  const {
    options: optionsBranches,
    handleLoadMore: handleLoadMoreBranches,
    handleSearch: handleSearchBranches,
  } = useOptionsPaginate(getBranchesAction, 'branchReducer', 'getBranchesResponse', 'branchName');

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const cityOptions = settingsState?.cities?.map((item) => ({ label: item.name, value: item.id }));
  const kitFeeOptions = settingsState?.kit_fee_definitions?.kit_fee_products?.map((item) => ({
    label: `${item.product_name} - ${formatCurrency({ amount: item.selling_price || 0, showSuffix: true })}`,
    value: String(item.product_id),
    data: item,
  }));

  const createPlayerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreatePlayerAction.CREATE_PLAYER],
  );
  const updatePlayerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdatePlayerAction.UPDATE_PLAYER],
  );
  const loading = createPlayerLoading || updatePlayerLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        // user_id
        name: values?.name,
        date_of_birth: values?.dateOfBirth?.valueOf(),
        clothes_number: values?.shirtNumber,
        class_id: values?.class ? Number(values?.class?.value) : undefined,
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        parent_name: values?.parentName,
        mobile: values?.phoneNumber,
        user_name: values?.loginId,
        raw_password: values?.password,
        address: values?.address,
        city_id: values?.city?.value,
        fee: values?.membershipFee,
        fixed_eras: values?.schedules?.map((item: TSelectOption) => item.value)?.join(','),
        kit_fee: values?.kits?.map((item: TSelectOption) => item.data),
        number_of_units: values?.numberOfUnits,
        payment_type: values?.paymentType?.value,
        note: values?.note,
      };

      if (data) {
        dispatch(updatePlayerAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createPlayerAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Học Viên Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  const schedulesOptions = (formValues?.class?.data as TClass)?.schedules
    ?.map((item) => {
      const parseDayOfWeek = item.at_eras.split(',');
      return parseDayOfWeek.map((subItem) => ({
        ...item,
        dayOfWeek: subItem,
      }));
    })
    .flat()
    .map((item) => {
      const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
      const endTime = formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm']);
      const dayLabel = dataDayOfWeeksOptions.find((subItem) => subItem.value === item.dayOfWeek)?.label;

      return {
        label: `${dayLabel} | ${startTime} - ${endTime}`,
        value: dayLabel,
      };
    });

  useEffect(() => {
    if (formValues?.branch?.value) handleResetClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.branch?.value]);

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          name: data?.name,
          dateOfBirth: data?.date_of_birth ? moment(data?.date_of_birth) : undefined,
          shirtNumber: data?.clothes_number,
          branch: data?.branch_id ? { label: data?.branch_name, value: String(data?.branch_id) } : undefined,
          class: data?.class ? { label: data?.class?.name, value: String(data?.class?.id) } : undefined,
          parentName: data?.parent_name,
          phoneNumber: data?.mobile,
          address: data?.address,
          city: cityOptions?.find((item) => item.value === data?.city?.id),
          note: data?.note,
          referralCode: data?.referral_code_used,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else {
        const dataChanged = {
          branch: currentBranch?.id ? [{ label: currentBranch?.name, value: String(currentBranch?.id) }] : undefined,
          password: generateInitialPassword(),
          kits: kitFeeOptions,
        };

        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalPlayerForm"
      title={data ? 'Sửa Học Viên' : 'Tạo mới Học Viên'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalPlayerForm-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
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
              <Form.Item name="shirtNumber">
                <Input label="Số áo" placeholder="Nhập dữ liệu" active numberic useNumber />
              </Form.Item>
            </Col>
            {!data && (
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
            )}

            {formValues?.branch && (
              <Col span={24}>
                <Form.Item name="class" rules={[validationRules.required()]}>
                  <Select
                    label="Lớp học"
                    placeholder="Chọn dữ liệu"
                    active
                    required
                    showSearch
                    options={optionsClasses}
                    onLoadMore={handleLoadMoreClasses}
                    onSearch={handleSearchClasses}
                  />
                </Form.Item>
              </Col>
            )}

            {formValues?.branch && formValues?.class && (
              <Col span={24}>
                <Form.Item name="schedule" rules={[validationRules.required()]}>
                  <CheckboxGroup label="Lịch tập" required options={schedulesOptions} />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item name="parentName" rules={[validationRules.required()]}>
                <Input label="Tên bố/mẹ" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input
                  label="Số điện thoại"
                  required
                  placeholder="Nhập dữ liệu"
                  active
                  numberic
                  onBlur={(): void => {
                    if (!formValues?.loginId) {
                      const dataChanged = {
                        loginId: formValues?.phoneNumber,
                      };
                      form.setFieldsValue(dataChanged);
                      setFormValues({ ...formValues, ...dataChanged });
                    }
                  }}
                />
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
              <Form.Item name="address" rules={[validationRules.required()]}>
                <Input label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="city" rules={[validationRules.required()]}>
                <Select label="Thành phố" options={cityOptions} required placeholder="Chọn dữ liệu" active showSearch />
              </Form.Item>
            </Col>
            {!data && (
              <>
                <Col span={24}>
                  <Form.Item name="membershipFee" rules={[validationRules.required()]}>
                    <Input
                      label="Phí hội viên"
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
                  <Form.Item name="kits">
                    <CheckboxGroup label="Bộ hỗ trợ" options={kitFeeOptions} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="numberOfUnits" rules={[validationRules.required()]}>
                    <Input
                      label="Số buổi học"
                      required
                      placeholder="Nhập dữ liệu"
                      active
                      numberic
                      useNumber
                      suffixText="buổi"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="paymentType" rules={[validationRules.required()]}>
                    <Select
                      label="Phương thức thanh toán"
                      required
                      placeholder="Chọn dữ liệu"
                      active
                      options={dataPaymentTypeOptions}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col span={24}>
              <Form.Item name="note">
                <TextArea label="Ghi chú" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="referralCode">
                <Input label="Mã giới thiệu" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalPlayerForm;
