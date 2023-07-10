import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from '@/components/Modal';
import {
  EGetBranchesAction,
  EGetBusStopsAction,
  EUpdatePickupAttendancesAction,
  getBranchesAction,
  getBusStopsAction,
  getPickupAttendancePlayersAction,
  updatePickupAttendancesAction,
} from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Empty from '@/components/Empty';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics, showNotification, validationRules } from '@/utils/functions';
import { EEmpty, EFormat, ETypeCheckIn, ETypeNotification } from '@/common/enums';
import Select from '@/components/Select';
import AttendanceCheckbox from '@/components/AttendanceCheckbox';
import { DEFAULT_PAGE } from '@/common/constants';
import { useOptionsPaginate } from '@/utils/hooks';

import { TModalCheckInsProps } from './ModalCheckIns.type';
import './ModalCheckIns.scss';

const ModalCheckIns: React.FC<TModalCheckInsProps> = ({
  visible,
  getPickupAttendancesParamsRequest,
  isValidTransportMode,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const currentBranch = useSelector((state: TRootState) => state.uiReducer.branch);
  const [form] = Form.useForm();
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

  const {
    options: optionsBusStops,
    handleLoadMore: handleLoadMoreBusStops,
    handleSearch: handleSearchBusStops,
    handleReset: handleResetBusStops,
  } = useOptionsPaginate(
    getBusStopsAction,
    'busStopReducer',
    'getBusStopsResponse',
    EGetBusStopsAction.GET_BUS_STOPS,
    undefined,
    { sort: 'pickup_time:asc', size: 100 },
    { branchIds: formValues?.branch?.value || '' },
    visible && isValidTransportMode,
  );

  const updatePickupAttendancesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdatePickupAttendancesAction.UPDATE_PICKUP_ATTENDANCES],
  );

  const pickupAttendancePlayersState = useSelector(
    (state: TRootState) => state.busStopReducer.getPickupAttendancePlayersResponse,
  )?.data?.content;

  const isEmpty = pickupAttendancePlayersState?.length === 0;

  const handleSubmit = (isClose?: boolean): void => {
    form.validateFields().then((values): void => {
      const body = pickupAttendancePlayersState?.map((item) => {
        const { [`${item?.player_id}_checked_in`]: pickupStatus } = formValues;

        return {
          bus_stop_id: values?.busStop ? Number(values?.busStop?.value) : undefined,
          player_id: item.player_id,
          pickup_status: typeof pickupStatus === 'number' ? pickupStatus : ETypeCheckIn.NONE,
          pickup_time: item.pickup_time || moment()?.valueOf(),
        };
      });

      dispatch(updatePickupAttendancesAction.request({ body }, isClose ? handleSubmitSuccess : handleNextBusStop));
    });
  };

  const handleNextBusStop = (): void => {
    const currentIndexBusStop = optionsBusStops.findIndex((item) => item.value === formValues?.busStop?.value);
    const nextBusStop = optionsBusStops[currentIndexBusStop + 1];
    if (nextBusStop) {
      showNotification(ETypeNotification.SUCCESS, 'Điểm danh thành công !');
      const dataChanged = {
        busStop: nextBusStop,
      };
      setFormValues({ ...formValues, ...dataChanged });
      dispatch(getPickupAttendancePlayersAction.success(undefined));
      form.setFieldsValue(dataChanged);
    } else {
      handleSubmitSuccess();
    }
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Điểm danh thành công !');
    onClose?.();
    onSuccess?.();
  };

  const getAttendancePlayers = useCallback(() => {
    if (
      visible &&
      getPickupAttendancesParamsRequest?.fromDate &&
      getPickupAttendancesParamsRequest?.toDate &&
      formValues?.busStop?.value &&
      formValues?.branch?.value
    ) {
      dispatch(
        getPickupAttendancePlayersAction.request({
          headers: { branchIds: formValues?.branch?.value },
          paths: { id: formValues?.busStop?.value },
          params: {
            page: DEFAULT_PAGE,
            size: 100,
            fromDate: getPickupAttendancesParamsRequest?.fromDate,
            toDate: getPickupAttendancesParamsRequest?.toDate,
          },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPickupAttendancesParamsRequest, formValues?.busStop?.value, visible, dispatch]);

  useEffect(() => {
    getAttendancePlayers();
  }, [getAttendancePlayers]);

  useEffect(() => {
    if (formValues?.branch?.value) handleResetBusStops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues?.branch?.value]);

  useEffect(() => {
    if (visible) {
      const dataChanged = {
        branch: currentBranch?.id ? { label: currentBranch?.name, value: String(currentBranch?.id) } : undefined,
        busStop: getPickupAttendancesParamsRequest?.busStopId,
      };

      form.setFieldsValue(dataChanged);
      setFormValues({ ...formValues, ...dataChanged });
    } else {
      form.setFieldsValue({});
      setFormValues({});
      dispatch(getPickupAttendancePlayersAction.success(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible, getPickupAttendancesParamsRequest]);

  useEffect(() => {
    if (pickupAttendancePlayersState) {
      const dataChanged = pickupAttendancePlayersState?.reduce((result, item) => {
        return {
          ...result,
          [`${item?.player_id}_checked_in`]: item.pickup_status,
        };
      }, {});

      form.setFieldsValue(dataChanged);
      setFormValues({ ...formValues, ...dataChanged });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, pickupAttendancePlayersState]);

  return (
    <>
      <Modal
        className="ModalCheckIns"
        title={`Điểm danh (${formatISODateToDateTime(
          getPickupAttendancesParamsRequest?.fromDate || '',
          EFormat['DD/MM/YYYY'],
        )})`}
        visible={visible}
        onClose={onClose}
        width={480}
        cancelButton={{
          title: 'Lưu & Đóng',
          disabled: updatePickupAttendancesLoading,
          onClick: (): void => handleSubmit(true),
        }}
        confirmButton={{ title: 'Lưu & Tiếp tục', disabled: updatePickupAttendancesLoading, onClick: handleSubmit }}
      >
        <div className="ModalCheckIns-wrapper">
          <Form form={form} onValuesChange={(value, values): void => setFormValues(values)}>
            <Row gutter={[16, 16]}>
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
                        branch: option,
                        busStop: undefined,
                      };
                      dispatch(getPickupAttendancePlayersAction.success(undefined));
                      setFormValues({ ...formValues, ...dataChanged });
                      form.setFieldsValue(dataChanged);
                    }}
                  />
                </Form.Item>
              </Col>
              {formValues?.branch?.value && (
                <Col span={24}>
                  <Form.Item name="busStop" rules={[validationRules.required()]}>
                    <Select
                      label="Điểm đón"
                      placeholder="Chọn dữ liệu"
                      required
                      active
                      showSearch
                      options={optionsBusStops}
                      onLoadMore={handleLoadMoreBusStops}
                      onSearch={handleSearchBusStops}
                      onChange={(): void => {
                        dispatch(getPickupAttendancePlayersAction.success(undefined));
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
              <Col span={24}>
                {isEmpty ? (
                  <Empty />
                ) : (
                  <Row gutter={[16, 0]} style={{ marginTop: -12 }}>
                    {pickupAttendancePlayersState?.map((item) => (
                      <Col span={24}>
                        <div className="ModalCheckIns-item">
                          <Row gutter={[16, 16]} wrap={false} align="middle">
                            <Col flex={1}>
                              <Row gutter={[8, 8]} wrap={false} align="middle">
                                <Col>
                                  <Avatar size={48} image={getFullUrlStatics(item?.player?.avatar)} />
                                </Col>
                                <Col flex={1}>
                                  <div className="ModalCheckIns-info">
                                    <div className="ModalCheckIns-info-title">{item?.player?.name}</div>
                                    {item?.player?.mobile ? (
                                      <a
                                        href={`tel: ${item?.player?.mobile}`}
                                        className="ModalCheckIns-link"
                                        onClick={(e): void => e.stopPropagation()}
                                      >
                                        {item?.player?.mobile}
                                      </a>
                                    ) : (
                                      <div className="ModalCheckIns-info-description">{EEmpty.DASH}</div>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              <div className="ModalCheckIns-info-description">Đi</div>

                              <Form.Item name={`${item?.player_id}_checked_in`}>
                                <AttendanceCheckbox />
                              </Form.Item>
                            </Col>
                            <Col>
                              <div className="ModalCheckIns-info-description">Về</div>

                              <Form.Item name={`${item?.player_id}_checked_out`}>
                                <AttendanceCheckbox />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCheckIns;
