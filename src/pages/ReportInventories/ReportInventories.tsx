import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { dataInventoryStatusOptions, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import { EEmpty } from '@/common/enums';
import { EGetReportInventoriesAction, getReportInventoriesAction } from '@/redux/actions';
import { getFullUrlStatics } from '@/utils/functions';
import Avatar from '@/components/Avatar';
import Status from '@/components/Status';
import { TGetReportInventoriesParams } from '@/services/api';
import { TInventory } from '@/common/models';
import Input from '@/components/Input';

import './ReportInventories.scss';

const ReportInventories: React.FC = () => {
  const dispatch = useDispatch();

  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const getReportInventoriesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetReportInventoriesAction.GET_REPORT_INVENTORIES],
  );
  const reportInventoriesState = useSelector(
    (state: TRootState) => state.reportReducer.getReportInventoriesResponse,
  )?.data;

  const [getReportInventoriesParamsRequest, setGetReportInventoriesParamsRequest] =
    useState<TGetReportInventoriesParams>({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE * 10,
    });

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetReportInventoriesParamsRequest({
      ...getReportInventoriesParamsRequest,
      page,
      size,
      sort,
    });
  };

  const handleSearch = (keyword?: string): void => {
    setGetReportInventoriesParamsRequest({
      ...getReportInventoriesParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 72,
      render: (value: string): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={72} image={getFullUrlStatics(value)} defaultImage shape="square" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Tên',
      sorter: true,
      keySort: 'product_name',
      className: 'limit-width',
      render: (_: string, record: TInventory): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.product?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.product?.code || EEmpty.DASH}
            </div>
            <div className="Table-info-description word-break-all ellipsis-2">
              {record?.product?.description || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'inputInventory',
      dataIndex: 'inputInventory',
      title: 'Số Lượng Nhập Hàng',
      sorter: true,
      keySort: 'quantities_in_hand',
      render: (_: string, record: TInventory): React.ReactElement => <>{record?.quantities_in_hand || EEmpty.ZERO}</>,
    },
    {
      key: 'soldInventory',
      dataIndex: 'soldInventory',
      title: 'Số Lượng Đã Bán',
      sorter: true,
      keySort: 'quantities_sold',
      render: (_: string, record: TInventory): React.ReactElement => <>{record?.quantities_sold || EEmpty.ZERO}</>,
    },
    {
      key: 'storageInventory',
      dataIndex: 'storageInventory',
      title: 'Số Lượng Tồn Kho',
      sorter: true,
      keySort: 'quantities_in_hand',
      render: (_: string, record: TInventory): React.ReactElement => (
        <>{(record?.quantities_in_hand || EEmpty.ZERO) - (record?.quantities_sold || EEmpty.ZERO)}</>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'status',
      render: (_: string, record: TInventory): React.ReactElement => {
        const status = dataInventoryStatusOptions.find((item) => item.value === record?.status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
  ];

  const getReportInventories = useCallback(() => {
    dispatch(
      getReportInventoriesAction.request({
        params: getReportInventoriesParamsRequest,
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getReportInventoriesParamsRequest, currentBranchId]);

  useEffect(() => {
    getReportInventories();
  }, [getReportInventories]);

  return (
    <div className="ReportInventories">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="Products-filter">
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
          <Card className="ReportInventories-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.BoxSeam} color={EIconColor.TUNDORA} />
                      Tổng Sản Phẩm:
                      <strong>{reportInventoriesState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              loading={getReportInventoriesLoading}
              columns={columns}
              dataSources={reportInventoriesState?.content || []}
              page={getReportInventoriesParamsRequest.page}
              pageSize={getReportInventoriesParamsRequest.size}
              total={reportInventoriesState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportInventories;
