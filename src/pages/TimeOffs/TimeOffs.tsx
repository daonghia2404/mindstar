import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/Card';
import Select from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty } from '@/common/enums';
import { TTimeOff } from '@/common/models';
import { getFullUrlStatics } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import Avatar from '@/components/Avatar';
import { EGetTimeOffsAction, getTimeOffsAction } from '@/redux/actions';
import { TGetTimeOffsParams } from '@/services/api';
import Tags from '@/components/Tags';

import './TimeOffs.scss';

const TimeOffs: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const timeOffsState = useSelector((state: TRootState) => state.timeOffReducer.getTimeOffsResponse)?.data;
  const getTimeOffsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetTimeOffsAction.GET_TIME_OFFS]);

  const [getTimeOffsParamsRequest, setGetTimeOffsParamsRequest] = useState<TGetTimeOffsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    fromDate: moment({ year: 2000 }).valueOf(),
    toDate: moment().valueOf(),
  });

  const [modalDeleteTimeOffState, setModalDeleteTimeOffState] = useState<{ visible: boolean; data?: TTimeOff }>({
    visible: false,
  });

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
      sorter: true,
      keySort: 'name',
      width: 180,
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
      key: 'classes',
      dataIndex: 'classes',
      title: 'Lớp Học',
      render: (_: string, record: TTimeOff): React.ReactElement =>
        record?.player?.class ? (
          <Tags
            options={[
              {
                label: record?.player?.class.name,
                value: String(record?.player?.class.id),
                data: { iconName: EIconName.ChalkBoard },
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
    dispatch(getTimeOffsAction.request({ params: getTimeOffsParamsRequest, headers: { branchIds: currentBranchId } }));
  }, [dispatch, getTimeOffsParamsRequest, currentBranchId]);

  useEffect(() => {
    getTimeOffs();
  }, [getTimeOffs]);

  return (
    <div className="TimeOffs">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="TimeOffs-filter">
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
                  <Col>
                    <Select label="All Classes" options={[]} placement="topLeft" size="middle" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card className="TimeOffs-table">
            <Table
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
    </div>
  );
};

export default TimeOffs;
