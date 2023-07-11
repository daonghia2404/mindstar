import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { Link } from '@reach/router';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataTypeCheckInOptions } from '@/common/constants';
import { EBusStopDirection, EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import { TGetPickupAttendancesParams } from '@/services/api';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import {
  EGetPickupAttendancesAction,
  getPickupAttendancesAction,
  EGetBusStopsAction,
  getBusStopsAction,
} from '@/redux/actions';
import { TPickupAttendance } from '@/common/models';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import DatePicker from '@/components/DatePicker';
import Select, { TSelectOption } from '@/components/Select';
import { useOptionsPaginate } from '@/utils/hooks';
import ModalCheckIns from '@/pages/PickupAttendances/ModalCheckIns';
import Status from '@/components/Status';
import Tags from '@/components/Tags';
import { Paths } from '@/pages/routers';
import BlockPermission from '@/components/BlockPermission';

import { TPickupAttendancesProps } from './PickupAttendances.types';
import './PickupAttendances.scss';

const PickupAttendances: React.FC<TPickupAttendancesProps> = ({ forward }) => {
  const dispatch = useDispatch();

  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getPickupAttendancesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetPickupAttendancesAction.GET_PICKUP_ATTENDANCES],
  );
  const pickupAttendancesState = useSelector(
    (state: TRootState) => state.busStopReducer.getPickupAttendancesResponse,
  )?.data;
  const [modalCheckInsState, setModalCheckInsState] = useState<{ visible: boolean }>({ visible: false });

  const isValidTransportMode = settingsState?.transport_settings
    ?.filter((item) => item.is_enable)
    ?.map((item) => item.branch_id)
    ?.includes(currentBranchId as number);

  const {
    options: optionsBusStops,
    handleLoadMore: handleLoadMoreBusStops,
    handleSearch: handleSearchBusStops,
  } = useOptionsPaginate(
    getBusStopsAction,
    'busStopReducer',
    'getBusStopsResponse',
    EGetBusStopsAction.GET_BUS_STOPS,
    undefined,
    { sort: 'pickup_time:asc' },
    { branchIds: currentBranchId },
    isValidTransportMode,
  );

  const [getPickupAttendancesParamsRequest, setGetPickupAttendancesParamsRequest] =
    useState<TGetPickupAttendancesParams>({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE,
      fromDate: moment().startOf('day').valueOf(),
      toDate: moment().endOf('day').valueOf(),
    });

  const handleSearch = (keyword?: string): void => {
    setGetPickupAttendancesParamsRequest({
      ...getPickupAttendancesParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetPickupAttendancesParamsRequest({
      ...getPickupAttendancesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleOpenModalCheckIns = (): void => {
    setModalCheckInsState({ visible: true });
  };

  const handleCloseModalCheckIns = (): void => {
    setModalCheckInsState({ visible: false });
  };

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TPickupAttendance): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.player?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'name',
      className: 'limit-width',
      render: (_: string, record: TPickupAttendance): React.ReactElement => {
        return (
          <div className="Table-info">
            <Link to={Paths.PlayerDetail(String(record?.player?.id))} className="Table-info-title">
              {record?.player?.name || EEmpty.DASH}
            </Link>
            <div className="Table-info-description">
              {record?.player?.date_of_birth
                ? formatISODateToDateTime(record.player?.date_of_birth, EFormat['DD/MM/YYYY'])
                : EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      className: 'limit-width',
      render: (_: string, record: TPickupAttendance): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.player?.address || EEmpty.DASH}</div>
            <div className="Table-info-description">{record?.player?.city_name || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: 'Số điện thoại',
      render: (_: string, record: TPickupAttendance): React.ReactElement =>
        record?.player?.mobile ? (
          <a href={`tel: ${record?.player?.mobile}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
            {record?.player?.mobile}
          </a>
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'busStop',
      dataIndex: 'busStop',
      title: 'Điểm đón',
      render: (_: string, record: TPickupAttendance): React.ReactElement =>
        record?.bus_stop_id ? (
          <Tags
            options={[
              {
                label: record?.bus_stop_name || EEmpty.DASH,
                value: String(record?.bus_stop_id),
                data: { iconName: EIconName.Map },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'checked_in',
      render: (_: string, record: TPickupAttendance): React.ReactElement => {
        const status = dataTypeCheckInOptions.find((item) => item.value === record.pickup_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
  ];

  const getPickupAttendances = useCallback(() => {
    if (isValidTransportMode) {
      dispatch(
        getPickupAttendancesAction.request({
          params: {
            ...getPickupAttendancesParamsRequest,
            busStopId: (getPickupAttendancesParamsRequest?.busStopId as unknown as TSelectOption)?.value,
            direction: forward ? EBusStopDirection.FORWARD : EBusStopDirection.BACK,
          },
          headers: { branchIds: currentBranchId },
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getPickupAttendancesParamsRequest, currentBranchId]);

  useEffect(() => {
    getPickupAttendances();
  }, [getPickupAttendances]);

  return (
    <div className="PickupAttendances">
      {!isValidTransportMode && (
        <BlockPermission
          title={
            <>
              Chi nhánh chưa được kích hoạt chế độ điểm đón. <br /> Vui lòng kích hoạt trong phần Cài Đặt.
            </>
          }
          buttonProps={{ title: 'Cài đặt', iconName: EIconName.Settings, link: Paths.TransportMode }}
        />
      )}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="PickupAttendances-filter">
            <Row gutter={[16, 16]} justify="space-between">
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      onSearch={handleSearch}
                    />
                  </Col>
                  <Col>
                    <Select
                      label="Điểm đón"
                      placeholder="Chọn dữ liệu"
                      value={getPickupAttendancesParamsRequest?.busStopId as any}
                      showSearch
                      options={optionsBusStops}
                      allowClear
                      onLoadMore={handleLoadMoreBusStops}
                      onSearch={handleSearchBusStops}
                      onChange={(option): void => {
                        setGetPickupAttendancesParamsRequest({
                          ...getPickupAttendancesParamsRequest,
                          page: DEFAULT_PAGE,
                          busStopId: option as any,
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>

              <Col>
                <DatePicker
                  style={{ minWidth: '18rem' }}
                  value={moment(getPickupAttendancesParamsRequest.fromDate)}
                  label="Ngày"
                  placeholder=" "
                  onChange={(data: Moment): void => {
                    setGetPickupAttendancesParamsRequest({
                      ...getPickupAttendancesParamsRequest,
                      page: DEFAULT_PAGE,
                      fromDate: data?.clone()?.startOf('day')?.valueOf(),
                      toDate: data?.clone()?.endOf('day')?.valueOf(),
                    });
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="PickupAttendances-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <Row gutter={[24, 16]}>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserCheck} color={EIconColor.TUNDORA} />
                          Có Mặt: <strong>{pickupAttendancesState?.total_present || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserX} color={EIconColor.TUNDORA} />
                          Vắng Mặt: <strong>{pickupAttendancesState?.total_absent || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      {/* <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UserCancel} color={EIconColor.TUNDORA} />
                          Chưa Điểm Danh: <strong>{EEmpty.ZERO}</strong>
                        </div>
                      </Col> */}
                    </Row>
                  </Col>

                  <Col>
                    <Button
                      title="Điểm danh"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalCheckIns}
                    />
                  </Col>
                </Row>
              }
              loading={getPickupAttendancesLoading}
              columns={columns}
              dataSources={pickupAttendancesState?.content || []}
              page={getPickupAttendancesParamsRequest?.page}
              pageSize={getPickupAttendancesParamsRequest?.size}
              total={pickupAttendancesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalCheckIns
        {...modalCheckInsState}
        direction={forward ? EBusStopDirection.FORWARD : EBusStopDirection.BACK}
        isValidTransportMode={isValidTransportMode}
        getPickupAttendancesParamsRequest={getPickupAttendancesParamsRequest}
        onClose={handleCloseModalCheckIns}
        onSuccess={getPickupAttendances}
      />
    </div>
  );
};

export default PickupAttendances;
