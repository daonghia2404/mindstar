import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select, { TSelectOption } from '@/components/Select';
import Switch from '@/components/Switch';
import { TRootState } from '@/redux/reducers';
import {
  ECreateEventAction,
  EGetBranchesAction,
  EGetClassesAction,
  EUpdateEventAction,
  createEventAction,
  getBranchesAction,
  getClassesAction,
  updateEventAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EFormat, ETypeNotification } from '@/common/enums';
import { useOptionsPaginate } from '@/utils/hooks';
import MultipleSelect from '@/components/MultipleSelect';
import DatePicker from '@/components/DatePicker';

import { TModalEventFormProps } from './ModalEventForm.type';
import './ModalEventForm.scss';

const ModalEventForm: React.FC<TModalEventFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<any>({});
  const [form] = Form.useForm();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

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

  const {
    options: optionsClasses,
    handleLoadMore: handleLoadMoreClasses,
    handleSearch: handleSearchClasses,
    handleReset: handleResetClasses,
  } = useOptionsPaginate(
    getClassesAction,
    'classReducer',
    'getClassesResponse',
    EGetClassesAction.GET_CLASSES,
    undefined,
    {},
    { branchIds: formValues?.branch?.value || '' },
    visible,
  );

  const createEventLoading = useSelector((state: TRootState) => state.loadingReducer[ECreateEventAction.CREATE_EVENT]);
  const updateEventLoading = useSelector((state: TRootState) => state.loadingReducer[EUpdateEventAction.UPDATE_EVENT]);
  const loading = createEventLoading || updateEventLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        title: values?.title,
        location: values?.location,
        branch_id: values?.branch?.value,
        class_ids: values?.classes?.map((item: TSelectOption) => Number(item.value))?.join(','),
        is_repeat: values?.isRepeat ? 1 : 0,
        start_date_time: values?.startDate?.valueOf(),
        end_date_time: values?.endDate?.valueOf(),
        frequency_type: 1,
      };

      if (data) {
        dispatch(updateEventAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createEventAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Sự Kiện Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (formValues?.branch?.value) handleResetClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.branch?.value]);

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          title: data?.title,
          location: data?.location,
          startDate: data?.start_date_time ? moment(data?.start_date_time) : undefined,
          endDate: data?.end_date_time ? moment(data?.end_date_time) : undefined,
          classes: data?.classes?.map((item) => ({ label: item?.name, value: String(item?.id) })),
          branch: data?.branch ? { label: data?.branch?.name, value: String(data?.branch?.id) } : undefined,
          isRepeat: data?.is_repeat,
        };
        form.setFieldsValue(dataChanged);
        setFormValues({ ...formValues, ...dataChanged });
      } else {
        const dataChanged = {
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
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
      className="ModalEventForm"
      title={data ? 'Sửa Sự Kiện' : 'Tạo mới Sự Kiện'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalEventForm-wrapper">
        <Form form={form} onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="title" rules={[validationRules.required()]}>
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="location" rules={[validationRules.required()]}>
                <Input label="Địa điểm" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="startDate" rules={[validationRules.required()]}>
                <DatePicker
                  showTime
                  format={EFormat['DD/MM/YYYY - HH:mm']}
                  label="Thời gian bắt đầu"
                  required
                  placeholder="Chọn dữ liệu"
                  active
                  onChange={(dataDate: Moment): void => {
                    const endDateTimeValues = formValues?.endDate;
                    if (endDateTimeValues && dataDate && endDateTimeValues < dataDate) {
                      const dataChanged = {
                        startDate: endDateTimeValues,
                        endDate: dataDate,
                      };
                      form.setFieldsValue(dataChanged);
                      setFormValues({ ...formValues, ...dataChanged });
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="endDate" rules={[validationRules.required()]}>
                <DatePicker
                  showTime
                  format={EFormat['DD/MM/YYYY - HH:mm']}
                  label="Thời gian kết thúc"
                  required
                  placeholder="Chọn dữ liệu"
                  active
                  onChange={(dataDate: Moment): void => {
                    const startDateTimeValues = formValues?.startDate;
                    if (startDateTimeValues && dataDate && startDateTimeValues > dataDate) {
                      const dataChanged = {
                        endDate: startDateTimeValues,
                        startDate: dataDate,
                      };
                      form.setFieldsValue(dataChanged);
                      setFormValues({ ...formValues, ...dataChanged });
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="isRepeat">
                <Switch label="Lặp lại" />
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
                  onChange={(): void => {
                    const dataChanged = {
                      classes: undefined,
                    };
                    form.setFieldsValue(dataChanged);
                    setFormValues({ ...formValues, ...dataChanged });
                  }}
                />
              </Form.Item>
            </Col>
            {formValues?.branch && (
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
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalEventForm;
