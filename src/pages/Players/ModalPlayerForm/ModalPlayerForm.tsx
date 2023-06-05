import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

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
  getPlayerAction,
  searchUserAction,
  updatePlayerAction,
  uploadAvatarUserAction,
} from '@/redux/actions';
import {
  copyText,
  formatCurrency,
  formatISODateToDateTime,
  generateInitialPassword,
  getFullUrlStatics,
  schedulesOptionsByClassSchedule,
  showNotification,
  validationRules,
} from '@/utils/functions';
import { EFormat, ETypeNotification, EUserType } from '@/common/enums';
import DatePicker from '@/components/DatePicker';
import { dataDayOfWeeksOptions, dataPaymentTypeOptions } from '@/common/constants';
import TextArea from '@/components/TextArea';
import { useOptionsPaginate } from '@/utils/hooks';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Tooltip from '@/components/Tooltip';
import CheckboxGroup from '@/components/CheckboxGroup';
import { TClass, TUser } from '@/common/models';
import ModalAddPlayerInExistedUser from '@/pages/Players/ModalAddPlayerInExistedUser';

import { TModalPlayerFormProps } from './ModalPlayerForm.type';
import './ModalPlayerForm.scss';
import UploadImage from '@/components/UploadImage';

const ModalPlayerForm: React.FC<TModalPlayerFormProps> = ({ visible, data, dataPractice, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const [modalAddPlayerInExistedUserState, setModalAddPlayerInExistedUserState] = useState<{
    visible: boolean;
    data?: TUser;
  }>({
    visible: false,
  });
  const isConfirmAddInExistedUser =
    !modalAddPlayerInExistedUserState.visible && Boolean(modalAddPlayerInExistedUserState?.data?.id);

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

  const playerState = useSelector((state: TRootState) => state.playerReducer.getPlayerResponse)?.data;

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

  const handleOpenAddPlayerInExistedUserModal = (dataModal?: TUser): void => {
    setModalAddPlayerInExistedUserState({ ...modalAddPlayerInExistedUserState, visible: true, data: dataModal });
  };

  const handleCloseAddPlayerInExistedUserModal = (): void => {
    const dataChanged = {
      loginId: undefined,
    };
    form.setFieldsValue(dataChanged);
    setFormValues({ ...formValues, ...dataChanged });

    setModalAddPlayerInExistedUserState({ visible: false });
  };

  const handleSubmitAddPlayerInExistedUserModal = (): void => {
    setModalAddPlayerInExistedUserState({ ...modalAddPlayerInExistedUserState, visible: false });
    const dataChanged = {
      parentName: modalAddPlayerInExistedUserState?.data?.name,
      phoneNumber: modalAddPlayerInExistedUserState?.data?.mobile,
      address: modalAddPlayerInExistedUserState?.data?.address,
      city: cityOptions?.find((item) => item.value === modalAddPlayerInExistedUserState?.data?.city?.id),
    };
    form.setFieldsValue(dataChanged);
    setFormValues({ ...formValues, ...dataChanged });
  };

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const parseScheduleGroup: { [key: number]: any } = _.groupBy(
        values?.schedules?.map((item: TSelectOption) => {
          const startTime = item?.data?.at_time;
          const endTime = item?.data?.duration_in_second;

          return {
            ...item?.data,
            at_time: startTime,
            duration_in_second: item?.data?.duration_in_second,
            totalTime: startTime + endTime,
          };
        }) || [],
        'totalTime',
      );

      const parseScheduleData = Object.keys(parseScheduleGroup)
        ?.map((item) => {
          const firstItem = parseScheduleGroup?.[item as unknown as number]?.[0];
          const mergeDayOfWeek = _.uniq(
            parseScheduleGroup?.[item as unknown as number]?.map((subItem: any) => {
              return subItem?.day_of_week || subItem?.dayOfWeek;
            }),
          )?.join(',');

          return {
            day_of_week: mergeDayOfWeek,
            at_time: firstItem?.at_time,
            duration_in_second: firstItem?.duration_in_second,
          };
        })
        .flat();

      const body = {
        user_id: modalAddPlayerInExistedUserState?.data?.id,
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
        player_schedules: parseScheduleData,
        kit_fee: values?.kits?.map((item: TSelectOption) => item.data),
        number_of_units: values?.numberOfUnits,
        payment_type: values?.paymentType?.value,
        note: values?.note,
        referral_code: values?.referralCode,
      };

      if (data) {
        dispatch(
          updatePlayerAction.request({ body, paths: { id: data?.id } }, (response): void =>
            handleUploadAvatar(response.data, values),
          ),
        );
      } else {
        dispatch(createPlayerAction.request({ body }, (response): void => handleUploadAvatar(response.data, values)));
      }
    });
  };

  const handleUploadAvatar = (response: TUser, values: any): void => {
    const isUploadAvatar = values?.avatar !== getFullUrlStatics(data?.avatar);
    if (!isUploadAvatar) handleSubmitSuccess();
    else {
      const formData = new FormData();
      formData.append('file', values?.avatar);
      dispatch(
        uploadAvatarUserAction.request(
          { body: formData, paths: { id: response?.id || '', userType: EUserType.PLAYER } },
          handleSubmitSuccess,
        ),
      );
    }
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Học Viên Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  const handleFindExistedUser = (userName?: string): void => {
    dispatch(
      searchUserAction.request({ params: { userName } }, (response): void => {
        handleOpenAddPlayerInExistedUserModal(response.data);
      }),
    );
  };

  const schedulesOptions = schedulesOptionsByClassSchedule((formValues?.class?.data as TClass)?.schedules);

  useEffect(() => {
    if (formValues?.branch?.value) handleResetClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.branch?.value]);

  useEffect(() => {
    if (visible) {
      if (data && playerState) {
        const dataChanged = {
          avatar: data?.avatar ? getFullUrlStatics(data.avatar) : undefined,
          name: data?.name,
          dateOfBirth: data?.date_of_birth ? moment(data?.date_of_birth) : undefined,
          shirtNumber: data?.clothes_number,
          branch: data?.branch_id ? { label: data?.branch_name, value: String(data?.branch_id) } : undefined,
          class: data?.class
            ? {
                label: data?.class?.name,
                value: String(data?.class?.id),
                data: {
                  schedules: playerState?.class_schedules,
                },
              }
            : undefined,
          parentName: data?.parent_name,
          phoneNumber: data?.mobile,
          address: data?.address,
          city: cityOptions?.find((item) => item.value === data?.city_id),
          schedules: data?.player_schedules
            ?.filter((item) => item.day_of_week)
            ?.map((item) => {
              return item?.day_of_week
                ?.split(',')
                ?.filter((subItem) => subItem)
                ?.map((subItem) => {
                  const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
                  const endTime = formatISODateToDateTime(
                    item.at_time + item.duration_in_second * 1000,
                    EFormat['HH:mm'],
                  );
                  const dayLabel = dataDayOfWeeksOptions.find((option) => option.value === subItem)?.label;

                  return {
                    label: `${dayLabel} | ${startTime} - ${endTime}`,
                    value: subItem,
                    data: item,
                  };
                });
            })
            ?.flat(),
          note: playerState?.note,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else if (dataPractice) {
        const dataChanged = {
          name: dataPractice?.name,
          dateOfBirth: dataPractice?.date_of_birth ? moment(dataPractice?.date_of_birth) : undefined,
          branch: dataPractice?.branch_id
            ? { label: dataPractice?.branch_name, value: String(dataPractice?.branch_id) }
            : undefined,
          parentName: dataPractice?.parent_name,
          phoneNumber: dataPractice?.mobile,
          address: dataPractice?.address,
          password: generateInitialPassword(),
          kits: kitFeeOptions,
          city: cityOptions?.find((item) => item.value === dataPractice?.city_id),
        };

        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else {
        const dataChanged = {
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
          password: generateInitialPassword(),
          numberOfUnits: settingsState?.transaction_settings?.fee_transaction_duration_in_units,
          kits: kitFeeOptions,
        };

        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      }
    } else {
      form.resetFields();
      setFormValues({});
      handleCloseAddPlayerInExistedUserModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data, playerState]);

  const getPlayer = useCallback(() => {
    if (data?.id && visible) {
      dispatch(getPlayerAction.request({ paths: { id: data?.id } }));
    }
  }, [dispatch, visible, data]);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  return (
    <>
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
          <Form form={form} onValuesChange={(value, values): void => setFormValues({ ...formValues, ...values })}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item name="avatar">
                  <UploadImage label="Ảnh đại diện" active sizeImage={100} center />
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
                      onChange={(option): void => {
                        const dataChanged = {
                          class: undefined,
                          schedules: undefined,
                          branch: option,
                        };
                        form.setFieldsValue(dataChanged);
                        setFormValues({ ...formValues, ...dataChanged });
                      }}
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
                      onChange={(option): void => {
                        const dataChanged = {
                          class: option,
                          schedules: undefined,
                          membershipFee:
                            option?.data?.course_fee || settingsState?.transaction_settings?.fee_transaction_value,
                        };
                        form.setFieldsValue(dataChanged);
                        setFormValues({ ...formValues, ...dataChanged });
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
              {formValues?.branch && formValues?.class && (
                <Col span={24}>
                  <Form.Item name="schedules" rules={[validationRules.required()]}>
                    <CheckboxGroup label="Lịch học" required options={schedulesOptions} />
                  </Form.Item>
                </Col>
              )}
              <Col span={24}>
                <Form.Item name="parentName" rules={[validationRules.required()]}>
                  <Input
                    label="Tên bố/mẹ"
                    required
                    placeholder="Nhập dữ liệu"
                    active
                    disabled={isConfirmAddInExistedUser}
                  />
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
                      if (!data && !formValues?.loginId) {
                        const dataChanged = {
                          loginId: formValues?.phoneNumber,
                        };
                        form.setFieldsValue(dataChanged);
                        setFormValues({ ...formValues, ...dataChanged });
                        handleFindExistedUser(formValues?.phoneNumber);
                      }
                    }}
                    disabled={isConfirmAddInExistedUser}
                  />
                </Form.Item>
              </Col>
              {!data && (
                <>
                  <Col span={24}>
                    <Form.Item name="loginId" rules={[validationRules.required()]}>
                      <Input
                        label="Tên đăng nhập"
                        required
                        placeholder="Nhập dữ liệu"
                        active
                        onSearch={handleFindExistedUser}
                        disabled={isConfirmAddInExistedUser}
                      />
                    </Form.Item>
                  </Col>
                  {!isConfirmAddInExistedUser && (
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
                  )}
                </>
              )}

              <Col span={24}>
                <Form.Item name="address" rules={[validationRules.required()]}>
                  <Input
                    label="Địa chỉ"
                    required
                    placeholder="Nhập dữ liệu"
                    active
                    disabled={isConfirmAddInExistedUser}
                  />
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
                    disabled={isConfirmAddInExistedUser}
                  />
                </Form.Item>
              </Col>
              {!data && (
                <>
                  <Col span={24}>
                    <Form.Item name="membershipFee" rules={[validationRules.required()]}>
                      <Input
                        label="Học phí"
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
              {!data && (
                <Col span={24}>
                  <Form.Item name="referralCode">
                    <Input label="Mã giới thiệu" placeholder="Nhập dữ liệu" active />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </div>
      </Modal>

      <ModalAddPlayerInExistedUser
        {...modalAddPlayerInExistedUserState}
        onClose={handleCloseAddPlayerInExistedUserModal}
        onSubmit={handleSubmitAddPlayerInExistedUserModal}
      />
    </>
  );
};

export default ModalPlayerForm;
