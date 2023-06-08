import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty, EFormat } from '@/common/enums';
import { TTimeOff } from '@/common/models';
import { capitalizeFirstLetter, formatISODateToDateTime, getFullUrlStatics } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import { EGetClassesAction, EGetTimeOffsAction, getClassesAction, getTimeOffsAction } from '@/redux/actions';
import { TGetTimeOffsParams } from '@/services/api';
import Tags from '@/components/Tags';
import { Paths } from '@/pages/routers';
import ModalDeleteTimeOff from '@/pages/TimeOffs/ModalDeleteTimeOff';

import './TimeOffs.scss';
import { useOptionsPaginate } from '@/utils/hooks';
import MultipleSelect from '@/components/MultipleSelect';
import { TSelectOption } from '@/components/Select';
import DatePicker from '@/components/DatePicker';

const TimeOffs: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const timeOffsState = useSelector((state: TRootState) => state.timeOffReducer.getTimeOffsResponse)?.data;
  const getTimeOffsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetTimeOffsAction.GET_TIME_OFFS]);

  const [getTimeOffsParamsRequest, setGetTimeOffsParamsRequest] = useState<TGetTimeOffsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    fromDate: moment().startOf('month').valueOf(),
    toDate: moment().endOf('month').valueOf(),
  });

  const [modalDeleteTimeOffState, setModalDeleteTimeOffState] = useState<{ visible: boolean; data?: TTimeOff }>({
    visible: false,
  });

  const {
    options: optionsClasses,
    handleSearch: handleSearchClasses,
    handleLoadMore: handleLoadMoreClasses,
  } = useOptionsPaginate(
    getClassesAction,
    'classReducer',
    'getClassesResponse',
    EGetClassesAction.GET_CLASSES,
    undefined,
    {},
    { branchIds: currentBranchId },
  );

  const handleOpenModalDeleteTimeOff = (data?: TTimeOff): void => {
    setModalDeleteTimeOffState({ visible: true, data });
  };
  const handleCloseModalDeleteTimeOff = (): void => {
    setModalDeleteTimeOffState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetTimeOffsParamsRequest({
      ...getTimeOffsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetTimeOffsParamsRequest({
      ...getTimeOffsParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const dataTableDropdownActions = (data?: TTimeOff): TDropdownMenuItem[] => [
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteTimeOff(data);
      },
    },
  ];

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 48,
      render: (_: string, record: TTimeOff): React.ReactElement => (
        <div className="Table-info">
          <Avatar size={48} image={getFullUrlStatics(record?.player?.avatar)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      className: 'limit-width',
      render: (_: string, record: TTimeOff): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.player?.name}</div>
          {record?.player?.mobile ? (
            <a href={`tel: ${record?.player?.mobile}`} className="Table-link">
              {record?.player?.mobile}
            </a>
          ) : (
            <div className="Table-info-description">{EEmpty.DASH}</div>
          )}
        </div>
      ),
    },
    {
      key: 'class',
      dataIndex: 'class',
      title: 'Lớp Học',
      render: (_: string, record: TTimeOff): React.ReactElement =>
        record?.player?.class ? (
          <Tags
            options={[
              {
                label: record?.player?.class.name,
                value: String(record?.player?.class.id),
                data: { iconName: EIconName.ChalkBoard },
                onClick: (): void => {
                  navigate(Paths.ClassDetail(String(record?.player?.class.id)));
                },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'branch',
      dataIndex: 'branch',
      title: 'Chi nhánh',
      render: (_: string, record: TTimeOff): React.ReactElement =>
        record?.branch ? (
          <Tags
            options={[
              {
                label: record?.branch.name,
                value: String(record?.branch.id),
                data: { iconName: EIconName.MapMarker },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'at_date_time',
      dataIndex: 'at_date_time',
      title: 'Thời gian nghỉ',
      render: (_: string, record: TTimeOff): React.ReactElement =>
        record.at_date_time ? (
          <Tags
            options={[
              {
                label: capitalizeFirstLetter(
                  formatISODateToDateTime(record.at_date_time, EFormat['dddd | DD/MM/YYYY - HH:mm']),
                ),
                value: String(record.at_date_time),
                data: { iconName: EIconName.Calendar },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'reason',
      dataIndex: 'reason',
      title: 'Lý do',
      className: 'limit-width',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TTimeOff): React.ReactElement => (
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

  const getTimeOffs = useCallback(() => {
    dispatch(
      getTimeOffsAction.request({
        params: {
          ...getTimeOffsParamsRequest,
          classIds: (getTimeOffsParamsRequest?.classIds as unknown as TSelectOption[])
            ?.map((item) => item.value)
            .join(','),
        },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getTimeOffsParamsRequest, currentBranchId]);

  useEffect(() => {
    getTimeOffs();
  }, [getTimeOffs]);

  return (
    <div className="TimeOffs">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="TimeOffs-filter">
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
                    <MultipleSelect
                      label="Lớp học"
                      value={getTimeOffsParamsRequest?.classIds as any}
                      onChange={(options): void => {
                        setGetTimeOffsParamsRequest({
                          ...getTimeOffsParamsRequest,
                          page: DEFAULT_PAGE,
                          classIds: options as any,
                        });
                      }}
                      showSearch
                      allowClear
                      options={optionsClasses}
                      onLoadMore={handleLoadMoreClasses}
                      onSearch={handleSearchClasses}
                      placement="topLeft"
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row gutter={[16, 16]}>
                  <Col>
                    <DatePicker
                      value={moment(getTimeOffsParamsRequest.fromDate)}
                      label="Tháng"
                      picker="month"
                      format={EFormat['MM/YYYY']}
                      placeholder=" "
                      onChange={(data: Moment): void => {
                        setGetTimeOffsParamsRequest({
                          ...getTimeOffsParamsRequest,
                          page: DEFAULT_PAGE,
                          fromDate: data?.clone()?.startOf('month')?.valueOf(),
                          toDate: data?.clone()?.endOf('month')?.valueOf(),
                        });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="TimeOffs-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.ClockCancel} color={EIconColor.TUNDORA} />
                      Tổng Yêu cầu nghỉ: <strong>{timeOffsState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getTimeOffsLoading}
              columns={columns}
              dataSources={timeOffsState?.content || []}
              page={getTimeOffsParamsRequest.page}
              pageSize={getTimeOffsParamsRequest?.size}
              total={timeOffsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>

      <ModalDeleteTimeOff
        {...modalDeleteTimeOffState}
        onClose={handleCloseModalDeleteTimeOff}
        onSuccess={getTimeOffs}
      />
    </div>
  );
};

export default TimeOffs;
