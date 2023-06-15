import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link } from '@reach/router';

import { Col, Row } from 'antd';
import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import { TGetBusStopPlayersParams, TGetBusStopsParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataDayOfWeeksOptions } from '@/common/constants';
import Table from '@/components/Table';
import { TRootState } from '@/redux/reducers';
import {
  EGetBusStopPlayersAction,
  EGetBusStopsAction,
  getBusStopPlayersAction,
  getBusStopsAction,
} from '@/redux/actions';
import { TBusStop, TBusStopPlayer } from '@/common/models';
import DropdownMenu, { TDropdownMenuItem } from '@/components/DropdownMenu';
import Avatar from '@/components/Avatar';
import { formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import Card from '@/components/Card';
import ModalDeleteBusStop from '@/pages/BusStops/ModalDeleteBusStop';
import ModalBusStopForm from '@/pages/BusStops/ModalBusStopForm';
import ModalBusStopPlayerForm from '@/pages/BusStops/ModalBusStopPlayerForm';
import ModalDeleteBusStopPlayer from '@/pages/BusStops/ModalDeleteBusStopPlayer';
import Tags from '@/components/Tags';
import { Paths } from '@/pages/routers';
import BlockPermission from '@/components/BlockPermission';

import './BusStops.scss';

const BusStops: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const settingsState = useSelector((state: TRootState) => state.settingReducer.getSettingsResponse)?.data;

  const busStopsState = useSelector((state: TRootState) => state.busStopReducer.getBusStopsResponse)?.data;
  const busStopPlayersState = useSelector((state: TRootState) => state.busStopReducer.getBusStopPlayersResponse)?.data;
  const getBusStopsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetBusStopsAction.GET_BUS_STOPS]);
  const getBusStopPlayersLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetBusStopPlayersAction.GET_BUS_STOP_PLAYERS],
  );

  const isValidTransportMode = settingsState?.transport_settings
    ?.filter((item) => item.is_enable)
    ?.map((item) => item.branch_id)
    ?.includes(currentBranchId as number);

  const isEmptyBusStopPlayers = !busStopPlayersState?.content;

  const [getBusStopsParamsRequest, setGetBusStopsParamsRequest] = useState<TGetBusStopsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    sort: 'pickup_time:asc',
  });

  const [getBusStopPlayersParamsRequest, setGetBusStopPlayersParamsRequest] = useState<TGetBusStopPlayersParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });

  const [currentSelectedBusStopId, setCurrentSelectedBusStopId] = useState<number>();

  const [modalDeleteBusStopState, setModalDeleteBusStopState] = useState<{ visible: boolean; data?: TBusStop }>({
    visible: false,
  });
  const [modalBusStopFormState, setModalBusStopFormState] = useState<{ visible: boolean; data?: TBusStop }>({
    visible: false,
  });
  const [modalBusStopPlayerFormState, setModalBusStopPlayerFormState] = useState<{
    visible: boolean;
    data?: TBusStopPlayer;
  }>({
    visible: false,
  });
  const [modalDeleteBusStopPlayerState, setModalDeleteBusStopPlayerState] = useState<{
    visible: boolean;
    data?: TBusStopPlayer;
  }>({
    visible: false,
  });

  const handleOpenModalBusStopForm = (data?: TBusStop): void => {
    setModalBusStopFormState({ visible: true, data });
  };
  const handleCloseModalBusStopForm = (): void => {
    setModalBusStopFormState({ visible: false });
  };

  const handleOpenModalDeleteBusStop = (data?: TBusStop): void => {
    setModalDeleteBusStopState({ visible: true, data });
  };
  const handleCloseModalDeleteBusStop = (): void => {
    setModalDeleteBusStopState({ visible: false });
  };

  const handleOpenModalBusStopPlayerForm = (data?: TBusStopPlayer): void => {
    setModalBusStopPlayerFormState({ visible: true, data });
  };
  const handleCloseModalBusStopPlayerForm = (): void => {
    setModalBusStopPlayerFormState({ visible: false });
  };

  const handleOpenModalDeleteBusStopPlayer = (data?: TBusStopPlayer): void => {
    setModalDeleteBusStopPlayerState({ visible: true, data });
  };
  const handleCloseModalDeleteBusStopPlayer = (): void => {
    setModalDeleteBusStopPlayerState({ visible: false });
  };

  const dataTableBusStopsDropdownActions = (data?: TBusStop): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalBusStopForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteBusStop(data);
      },
    },
  ];

  const dataTableBusStopPlayersDropdownActions = (data?: TBusStopPlayer): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalBusStopPlayerForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteBusStopPlayer(data);
      },
    },
  ];

  const columnsBusStops = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Điểm đón',
    },
    {
      key: 'time',
      dataIndex: 'time',
      title: 'Thời gian',
      render: (_: string, record: TBusStop): string =>
        record?.bus_schedules?.[0]
          ? formatISODateToDateTime(record?.bus_schedules?.[0]?.pickup_time, EFormat['HH:mm'])
          : EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TBusStop): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableBusStopsDropdownActions(record)}>
            <Button
              iconName={EIconName.DotsVertical}
              iconColor={EIconColor.BLACK}
              size="small"
              styleType={EButtonStyleType.GENERAL_FORM}
            />
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const columnsBusStopPlayers = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TBusStopPlayer): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={48} image={getFullUrlStatics(record?.player?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      render: (_: string, record: TBusStopPlayer): React.ReactElement => (
        <div className="Table-info">
          <Link to={Paths.PlayerDetail(String(record?.player?.id))} className="Table-info-title">
            {record?.player?.name || EEmpty.DASH}
          </Link>
          <div className="Table-info-description">{record?.player?.address || EEmpty.DASH}</div>
          {record?.player?.mobile ? (
            <a
              href={`tel: ${record?.player?.mobile}`}
              className="Table-link"
              onClick={(e): void => e.stopPropagation()}
            >
              {record?.player?.mobile}
            </a>
          ) : (
            <div className="Table-info-description">{EEmpty.DASH}</div>
          )}
        </div>
      ),
    },
    {
      key: 'schedule',
      dataIndex: 'schedule',
      title: 'Lịch đón',
      render: (_: string, record: TBusStopPlayer): React.ReactElement => {
        const schedulesArray = record?.day_of_week?.split(',') || [];

        if (schedulesArray.length === 0) return <>{EEmpty.DASH}</>;

        return (
          <Tags
            options={schedulesArray.map((item) => ({
              label: dataDayOfWeeksOptions.find((option) => option.value === item)?.label || '',
              value: item,
              data: { iconName: EIconName.Calendar },
            }))}
          />
        );
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TBusStopPlayer): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableBusStopPlayersDropdownActions(record)}>
            <Button
              iconName={EIconName.DotsVertical}
              iconColor={EIconColor.BLACK}
              size="small"
              styleType={EButtonStyleType.GENERAL_FORM}
            />
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const handleBusStopsPaginationChange = (page: number, size: number, sort?: string): void => {
    setGetBusStopsParamsRequest({
      ...getBusStopsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleBusStopPlayersPaginationChange = (page: number, size: number, sort?: string): void => {
    setGetBusStopPlayersParamsRequest({
      ...getBusStopPlayersParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetBusStopsParamsRequest({
      ...getBusStopsParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const getBusStops = useCallback(() => {
    if (isValidTransportMode) {
      dispatch(
        getBusStopsAction.request(
          { params: getBusStopsParamsRequest, headers: { branchIds: currentBranchId } },
          (response): void => {
            const isIncludeExistedBusStopId = response?.data?.content
              ?.map((item) => item.id)
              .includes(currentSelectedBusStopId as number);

            setCurrentSelectedBusStopId(
              isIncludeExistedBusStopId ? currentSelectedBusStopId : response?.data?.content?.[0]?.id,
            );
          },
        ),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getBusStopsParamsRequest, currentBranchId]);

  const getBusStopPlayers = useCallback(() => {
    if (currentSelectedBusStopId) {
      dispatch(
        getBusStopPlayersAction.request({
          paths: { id: String(currentSelectedBusStopId) },
          params: getBusStopPlayersParamsRequest,
        }),
      );
    } else {
      dispatch(getBusStopPlayersAction.success(undefined));
    }
  }, [dispatch, currentSelectedBusStopId, getBusStopPlayersParamsRequest]);

  useEffect(() => {
    getBusStopPlayers();
  }, [getBusStopPlayers]);

  useEffect(() => {
    getBusStops();
  }, [getBusStops]);

  return (
    <div className="BusStops">
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
          <Card className="Categories-filter">
            <Row gutter={[16, 16]}>
              <Col span={22}>
                <Row gutter={[24, 24]}>
                  <Col>
                    <Input
                      style={{ minWidth: '24rem' }}
                      label="Tìm kiếm"
                      suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                      onSearch={handleSearch}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={24} lg={{ span: 12 }}>
              <Card className="Categories-table">
                <Table
                  useCardResponsive={false}
                  header={
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.Map} color={EIconColor.TUNDORA} />
                          Tổng Điểm Đón: <strong>{busStopsState?.total_elements || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      <Col>
                        <Button
                          title="Tạo mới Điểm Đón"
                          styleType={EButtonStyleType.PURPLE}
                          iconName={EIconName.Plus}
                          iconColor={EIconColor.WHITE}
                          onClick={handleOpenModalBusStopForm}
                        />
                      </Col>
                    </Row>
                  }
                  rowClassName={(record: TBusStop): string =>
                    classNames('cursor-pointer', { 'hightlight': record.id === currentSelectedBusStopId })
                  }
                  onRow={(record: TBusStop): any => ({
                    onClick: (): void => {
                      setCurrentSelectedBusStopId(record.id);
                    },
                  })}
                  loading={getBusStopsLoading}
                  columns={columnsBusStops}
                  dataSources={busStopsState?.content || []}
                  page={getBusStopsParamsRequest.page}
                  pageSize={getBusStopsParamsRequest.size}
                  total={busStopsState?.total_elements}
                  onPaginationChange={handleBusStopsPaginationChange}
                />
              </Card>
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <Card className="Categories-table">
                <Table
                  useCardResponsive={false}
                  header={
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.UsersGroup} color={EIconColor.TUNDORA} />
                          Tổng Học Viên: <strong>{busStopPlayersState?.total_elements || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                      {!isEmptyBusStopPlayers && (
                        <Col>
                          <Button
                            title="Thêm mới Học Viên"
                            styleType={EButtonStyleType.PURPLE}
                            iconName={EIconName.Plus}
                            iconColor={EIconColor.WHITE}
                            onClick={handleOpenModalBusStopPlayerForm}
                          />
                        </Col>
                      )}
                    </Row>
                  }
                  loading={getBusStopPlayersLoading}
                  columns={columnsBusStopPlayers}
                  dataSources={busStopPlayersState?.content || []}
                  page={getBusStopPlayersParamsRequest.page}
                  pageSize={getBusStopPlayersParamsRequest.size}
                  total={busStopPlayersState?.total_elements}
                  onPaginationChange={handleBusStopPlayersPaginationChange}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <ModalBusStopForm {...modalBusStopFormState} onClose={handleCloseModalBusStopForm} onSuccess={getBusStops} />
      <ModalDeleteBusStop
        {...modalDeleteBusStopState}
        onClose={handleCloseModalDeleteBusStop}
        onSuccess={getBusStops}
      />
      <ModalBusStopPlayerForm
        {...modalBusStopPlayerFormState}
        dataBusStop={busStopsState?.content?.find((item) => item.id === currentSelectedBusStopId)}
        onClose={handleCloseModalBusStopPlayerForm}
        onSuccess={getBusStopPlayers}
      />
      <ModalDeleteBusStopPlayer
        {...modalDeleteBusStopPlayerState}
        dataBusStop={busStopsState?.content?.find((item) => item.id === currentSelectedBusStopId)}
        onClose={handleCloseModalDeleteBusStopPlayer}
        onSuccess={getBusStopPlayers}
      />
    </div>
  );
};

export default BusStops;
