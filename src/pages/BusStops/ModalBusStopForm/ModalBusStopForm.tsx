import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import {
  ECreateBusStopAction,
  EGetBranchesAction,
  EUpdateBusStopAction,
  createBusStopAction,
  getBranchesAction,
  updateBusStopAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EFormat, ETypeNotification } from '@/common/enums';
import { useOptionsPaginate } from '@/utils/hooks';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';

import { TModalBusStopFormProps } from './ModalBusStopForm.type';
import './ModalBusStopForm.scss';

const ModalBusStopForm: React.FC<TModalBusStopFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);

  const createBusStopLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateBusStopAction.CREATE_BUS_STOP],
  );
  const updateBusStopLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateBusStopAction.UPDATE_BUS_STOP],
  );
  const loading = createBusStopLoading || updateBusStopLoading;

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
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        branch_id: values?.branch ? Number(values?.branch?.value) : undefined,
        name: values?.name,
        bus_schedules: [
          {
            pickup_time: values?.pickupTime?.valueOf(),
            day_of_week: '1,2,3,4,5,6,7',
          },
        ],
      };

      if (data) {
        dispatch(updateBusStopAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createBusStopAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập Nhật' : 'Tạo Mới'} Điểm Đón Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue({
          name: data?.name,
          branch: data?.branch_id ? { label: data?.branch_name, value: String(data?.branch_id) } : undefined,
          pickupTime: data?.bus_schedules?.[0]?.pickup_time ? moment(data?.bus_schedules?.[0]?.pickup_time) : undefined,
        });
      } else {
        form.setFieldsValue({
          branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
        });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalBusStopForm"
      title={data ? 'Sửa Điểm Đón' : 'Tạo mới Điểm Đón'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalBusStopForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="branch" rules={[validationRules.required()]}>
                <Select
                  label="Chi nhánh"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  disabled={Boolean(data)}
                  options={optionsBranches}
                  onLoadMore={handleLoadMoreBranches}
                  onSearch={handleSearchBranches}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" rules={[validationRules.required()]}>
                <Input label="Tên" required placeholder="Nhập dữ liệu" active />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="pickupTime" rules={[validationRules.required()]}>
                <DatePicker
                  label="Giờ đón"
                  required
                  showNow={false}
                  placeholder="Chọn dữ liệu"
                  active
                  picker="time"
                  format={EFormat['HH:mm']}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalBusStopForm;
