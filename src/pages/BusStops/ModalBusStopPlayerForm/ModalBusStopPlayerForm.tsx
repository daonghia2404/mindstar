import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { TRootState } from '@/redux/reducers';
import {
  ECreateBusStopPlayerAction,
  EGetPlayersAction,
  EUpdateBusStopPlayerAction,
  createBusStopPlayerAction,
  getPlayersAction,
  updateBusStopPlayerAction,
} from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { EAuditingStatus, ETypeNotification } from '@/common/enums';
import { useOptionsPaginate } from '@/utils/hooks';
import WorkingTimes, { TWorkTime } from '@/components/WorkingTimes';
import Select from '@/components/Select';

import { TModalBusStopPlayerFormProps } from './ModalBusStopPlayerForm.type';
import './ModalBusStopPlayerForm.scss';

const ModalBusStopPlayerForm: React.FC<TModalBusStopPlayerFormProps> = ({
  visible,
  data,
  dataBusStop,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const createBusStopPlayerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateBusStopPlayerAction.CREATE_BUS_STOP_PLAYER],
  );
  const updateBusStopPlayerLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateBusStopPlayerAction.UPDATE_BUS_STOP_PLAYER],
  );
  const loading = createBusStopPlayerLoading || updateBusStopPlayerLoading;

  const {
    options: optionsPlayers,
    handleLoadMore: handleLoadMorePlayers,
    handleSearch: handleSearchPlayers,
    handleReset: handleResetPlayers,
  } = useOptionsPaginate(
    getPlayersAction,
    'playerReducer',
    'getPlayersResponse',
    EGetPlayersAction.GET_PLAYERS,
    undefined,
    {
      auditingStatuses: EAuditingStatus.ACTIVE,
    },
    { branchIds: dataBusStop?.branch_id || '' },
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        bus_stop_id: dataBusStop?.id,
        day_of_week: values?.schedules?.map((item: TWorkTime) => item.dayOfWeek)?.join(','),
        player_id: values?.player ? Number(values?.player?.value) : undefined,
      };

      if (data) {
        dispatch(updateBusStopPlayerAction.request({ body, paths: { id: data?.id } }, handleSubmitSuccess));
      } else {
        dispatch(createBusStopPlayerAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Sửa Lịch Đón' : 'Tạo Mới'} Học Viên Thành Công !`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      handleResetPlayers();
      if (data) {
        form.setFieldsValue({
          player: data?.player ? { label: data?.player?.name, value: String(data?.player?.id) } : undefined,
          schedules: data?.day_of_week
            ? data?.day_of_week?.split(',')?.map((item) => ({
                dayOfWeek: item,
              }))
            : undefined,
        });
      }
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form, data]);

  return (
    <Modal
      className="ModalBusStopPlayerForm"
      title={data ? 'Sửa Lịch Đón Học Viên' : 'Thêm mới Học Viên'}
      visible={visible}
      onClose={onClose}
      width={480}
      cancelButton={{ title: 'Huỷ Bỏ', disabled: loading, onClick: onClose }}
      confirmButton={{ title: 'Đồng Ý', disabled: loading, onClick: handleSubmit }}
    >
      <div className="ModalBusStopPlayerForm-wrapper">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="player" rules={[validationRules.required()]}>
                <Select
                  label="Học viên"
                  placeholder="Chọn dữ liệu"
                  required
                  active
                  showSearch
                  disabled={Boolean(data)}
                  options={optionsPlayers}
                  onLoadMore={handleLoadMorePlayers}
                  onSearch={handleSearchPlayers}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="schedules" rules={[validationRules.required()]}>
                <WorkingTimes label="Lịch đón" required showTime={false} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalBusStopPlayerForm;
