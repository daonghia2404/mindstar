import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import { TRootState } from '@/redux/reducers';
import { EUpdatePracticeAction, getPublicBranchesAction, updatePracticeAction } from '@/redux/actions';
import { formatISODateToDateTime, showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, EFormat, ETypeNotification } from '@/common/enums';
import TextArea from '@/components/TextArea';
import Input from '@/components/Input';
import DatePicker from '@/components/DatePicker';
import Select, { TSelectOption } from '@/components/Select';
import CheckboxGroup from '@/components/CheckboxGroup';
import { dataDayOfWeeksOptions } from '@/common/constants';

import { TModalPracticeFormProps } from './ModalPracticeForm.type';
import './ModalPracticeForm.scss';
import { TSchedule } from '@/common/models';

const ModalPracticeForm: React.FC<TModalPracticeFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [formValues, setFormValues] = useState<any>({});

  const publicBranchesState = useSelector((state: TRootState) => state.branchReducer.getPublicBranchesResponse)?.data;
  const branchesOptions = publicBranchesState?.map((item) => ({
    label: item.branch_name || '',
    value: String(item.id),
    data: item.schedules,
  }));

  const updatePracticeLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdatePracticeAction.UPDATE_PRACTICE],
  );
  const loading = updatePracticeLoading;

  const schedulesOptionsByClassSchedule = (scheduleData?: TSchedule[]): TSelectOption[] => {
    const schedulesOptions = scheduleData
      ?.filter((item) => item.at_eras)
      ?.map((item) => {
        const parseDayOfWeek = item.at_eras.split(',')?.filter((subItem) => subItem);
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
          value: `${item.dayOfWeek}-${item.at_time + item.duration_in_second}`,
          data: item,
        };
      });

    return schedulesOptions || [];
  };

  const schedulesOptions = schedulesOptionsByClassSchedule(formValues?.branch?.data);

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const parseScheduleData = values?.schedules?.map((item: any) => {
        return {
          day_of_week: item?.value?.split('-')[0],
          at_time: item?.data?.at_time,
          duration_in_second: item?.data?.duration_in_second,
        };
      });

      const body = {
        name: values?.name,
        date_of_birth: values?.dateOfBirth?.valueOf(),
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        parent_name: values?.parentName,
        mobile: values?.phoneNumber,
        address: values?.address,
        schedules: parseScheduleData,
        note: values?.note,
        status: EAuditingStatus.ACTIVE,
        auditing_status: EAuditingStatus.ACTIVE,
      };

      if (data) {
        dispatch(updatePracticeAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Học Thử Viên Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  const getPublicBranches = useCallback(() => {
    dispatch(getPublicBranchesAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getPublicBranches();
  }, [getPublicBranches]);

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          name: data?.name,
          dateOfBirth: data?.date_of_birth ? moment(data?.date_of_birth) : undefined,
          branch: branchesOptions?.find((item) => item.value === String(data?.branch_id)),
          parentName: data?.parent_name,
          phoneNumber: data?.mobile,
          address: data?.address,
          schedules: data?.schedules?.map((item) => {
            const startTime = formatISODateToDateTime(item.at_time, EFormat['HH:mm']);
            const endTime = formatISODateToDateTime(item.at_time + item.duration_in_second * 1000, EFormat['HH:mm']);
            const dayLabel = dataDayOfWeeksOptions.find((option) => option.value === item.day_of_week)?.label;

            return {
              label: `${dayLabel} | ${startTime} - ${endTime}`,
              value: `${item.day_of_week}-${item.at_time + item.duration_in_second}`,
              data: item,
            };
          }),
          note: data?.note,
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
      className="ModalPracticeForm"
      title={data ? 'Sửa Học Thử Viên' : 'Tạo mới Học Thử Viên'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalPracticeForm-wrapper">
        <Form form={form} onValuesChange={(value, values): void => setFormValues({ ...formValues, ...values })}>
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
              <Form.Item name="branch" rules={[validationRules.required()]}>
                <Select
                  label="Chi nhánh"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  options={branchesOptions}
                  onChange={(option): void => {
                    const dataChanged = {
                      schedules: undefined,
                      branch: option,
                    };
                    form.setFieldsValue(dataChanged);
                    setFormValues({ ...formValues, ...dataChanged });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="schedules" rules={[validationRules.required()]}>
                <CheckboxGroup label="Lịch học" required options={schedulesOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="parentName">
                <Input label="Tên bố/mẹ" placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phoneNumber" rules={[validationRules.required()]}>
                <Input label="Số điện thoại" required placeholder="Nhập dữ liệu" active numberic />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" rules={[validationRules.required()]}>
                <Input label="Địa chỉ" required placeholder="Nhập dữ liệu" active />
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

export default ModalPracticeForm;
