import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EAuditingStatus, EEmpty, EFormat } from '@/common/enums';
import Button, { EButtonStyleType } from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Input from '@/components/Input';
import Table from '@/components/Table';
import { EGetEventsAction, getEventsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { TGetEventsParams } from '@/services/api';
import { TEvent } from '@/common/models';
import { formatISODateToDateTime } from '@/utils/functions';
import ModalEventForm from '@/pages/Events/ModalEventForm';
import ModalDeleteEvent from '@/pages/Events/ModalDeleteEvent';

import './Events.scss';

const Events: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const eventesState = useSelector((state: TRootState) => state.eventReducer.getEventsResponse)?.data;
  const getEventsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetEventsAction.GET_EVENTS]);

  const [getEventsParamsRequest, setGetEventsParamsRequest] = useState<TGetEventsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });

  const [modalEventFormState, setModalEventFormState] = useState<{ visible: boolean; data?: TEvent }>({
    visible: false,
  });
  const [modalDeleteEventState, setModalDeleteEventState] = useState<{ visible: boolean; data?: TEvent }>({
    visible: false,
  });

  const handleOpenModalEventForm = (data?: TEvent): void => {
    setModalEventFormState({ visible: true, data });
  };
  const handleCloseModalEventForm = (): void => {
    setModalEventFormState({ visible: false });
  };

  const handleOpenModalDeleteEvent = (data?: TEvent): void => {
    setModalDeleteEventState({ visible: true, data });
  };
  const handleCloseModalDeleteEvent = (): void => {
    setModalDeleteEventState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetEventsParamsRequest({
      ...getEventsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetEventsParamsRequest({
      ...getEventsParamsRequest,
      page: DEFAULT_PAGE,
      title: keyword,
    });
  };

  const dataTableDropdownActions = (data?: TEvent): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalEventForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteEvent(data);
      },
    },
  ];

  const columns = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Tên',
      className: 'limit-width',
      width: 180,
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'location',
      dataIndex: 'location',
      title: 'Địa điểm',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'start_date_time',
      dataIndex: 'start_date_time',
      title: 'Thời gian bắt đầu',
      className: 'limit-width',
      render: (_: string, record: TEvent): string =>
        record?.start_date_time
          ? formatISODateToDateTime(record.start_date_time, EFormat['DD/MM/YYYY - HH:mm'])
          : EEmpty.DASH,
    },
    {
      key: 'end_date_time',
      dataIndex: 'end_date_time',
      title: 'Thời gian kết thúc',
      className: 'limit-width',
      render: (_: string, record: TEvent): string =>
        record?.end_date_time
          ? formatISODateToDateTime(record.end_date_time, EFormat['DD/MM/YYYY - HH:mm'])
          : EEmpty.DASH,
    },
    // {
    //   key: 'status',
    //   dataIndex: 'status',
    //   title: 'Trạng thái',
    //   render: (_: string, record: TEvent): React.ReactElement => {
    //     const status = dataAuditingStatusOptions.find((item) => item.value === record.auditing_status);
    //     return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
    //   },
    // },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TEvent): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <DropdownMenu placement="bottomRight" options={dataTableDropdownActions(record)}>
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

  const getEvents = useCallback(() => {
    dispatch(getEventsAction.request({ params: getEventsParamsRequest, headers: { branchIds: currentBranchId } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getEventsParamsRequest, currentBranchId]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <div className="Events">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Events-filter">
            <Row gutter={[16, 16]}>
              <Col>
                <Input
                  style={{ minWidth: '24rem' }}
                  label="Tìm kiếm"
                  suffixIcon={<Icon name={EIconName.Search} color={EIconColor.TUNDORA} />}
                  onSearch={handleSearch}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="Events-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.MapMarker} color={EIconColor.TUNDORA} />
                      Tổng Sự Kiện: <strong>{eventesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Sự Kiện"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalEventForm}
                    />
                  </Col>
                </Row>
              }
              loading={getEventsLoading}
              columns={columns}
              dataSources={eventesState?.content || []}
              page={getEventsParamsRequest?.page}
              pageSize={getEventsParamsRequest?.size}
              total={eventesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalEventForm {...modalEventFormState} onClose={handleCloseModalEventForm} onSuccess={getEvents} />
      <ModalDeleteEvent {...modalDeleteEventState} onClose={handleCloseModalDeleteEvent} onSuccess={getEvents} />
    </div>
  );
};

export default Events;
