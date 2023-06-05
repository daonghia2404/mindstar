import { Card, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Table from '@/components/Table';
import Switch from '@/components/Switch';
import { TGetEConnectsParams } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { EAuditingStatus, EEmpty } from '@/common/enums';
import { TEConnect } from '@/common/models';
import { TRootState } from '@/redux/reducers';
import { EGetEConnectsAction, getEConnectsAction } from '@/redux/actions';
import Avatar from '@/components/Avatar';
import { getFullUrlStatics } from '@/utils/functions';

import './Connects.scss';

const Connects: React.FC = () => {
  const dispatch = useDispatch();
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getEConnectsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetEConnectsAction.GET_E_CONNECTS],
  );
  const [getEConnectsParamsRequest, setGetEConnectsParamsRequest] = useState<TGetEConnectsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
  });
  const eConnectsState = useSelector((state: TRootState) => state.eConnectReducer.getEConnectsResponse)?.data;

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetEConnectsParamsRequest({
      ...getEConnectsParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetEConnectsParamsRequest({
      ...getEConnectsParamsRequest,
      page: DEFAULT_PAGE,
      name: keyword,
    });
  };

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      keySort: 'name',
      sorter: true,
      render: (_: string, record: TEConnect): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record.name}</div>
          <div className="Table-info-description">{record.feeds.length || EEmpty.ZERO}</div>
        </div>
      ),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Địa chỉ',
      render: (value: string): string => value || EEmpty.DASH,
    },
    {
      key: 'contact',
      dataIndex: 'contact',
      title: 'Liên hệ',
      render: (_: string, record: TEConnect): React.ReactElement => (
        <Row gutter={[16, 16]} align="middle" wrap={false}>
          <Col>
            <Avatar size={48} image={getFullUrlStatics(record.avatar)} />
          </Col>
          <Col>
            <div className="Table-info">
              <div className="Table-info-title">{record?.account_name}</div>
              {record.mobile ? (
                <a href={`tel: ${record.mobile}`} className="Table-link" onClick={(e): void => e.stopPropagation()}>
                  {record.mobile}
                </a>
              ) : (
                <>{EEmpty.DASH}</>
              )}
            </div>
          </Col>
        </Row>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      render: (_: string, record: TEConnect): React.ReactElement => (
        <div className="Table-info">
          <Switch readOnlyText value={record.auditing_status === EAuditingStatus.ACTIVE} />
        </div>
      ),
    },
  ];

  const getEConnects = useCallback(() => {
    dispatch(
      getEConnectsAction.request({ params: getEConnectsParamsRequest, headers: { branchIds: currentBranchId } }),
    );
  }, [dispatch, getEConnectsParamsRequest, currentBranchId]);

  useEffect(() => {
    getEConnects();
  }, [getEConnects]);

  return (
    <div className="Connects">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="EConnects-filter">
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
          <Card className="EConnects-table">
            <div className="Connects-filter">
              <Row gutter={[16, 16]}>
                <Col>
                  <div className="Table-total-item">
                    <Icon name={EIconName.Affiliate} color={EIconColor.TUNDORA} />
                    Tổng E-Connects: <strong>{eConnectsState?.total_elements || EEmpty.ZERO}</strong>
                  </div>
                </Col>
              </Row>
            </div>
            <Table
              loading={getEConnectsLoading}
              columns={columns}
              dataSources={eConnectsState?.content || []}
              page={getEConnectsParamsRequest.page}
              pageSize={getEConnectsParamsRequest.size}
              total={eConnectsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Connects;
