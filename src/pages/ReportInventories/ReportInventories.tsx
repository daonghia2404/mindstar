import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card';
import Select, { TSelectOption } from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { dataProductStatusOptions, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import { EAuditingStatus, EEmpty } from '@/common/enums';
import { EGetCategoriesAction, EGetInventorysAction, getCategoriesAction, getInventorysAction } from '@/redux/actions';
import { TReportInventory } from '@/common/models';
import { getFullUrlStatics } from '@/utils/functions';
import Avatar from '@/components/Avatar';
import Status from '@/components/Status';
import { useOptionsPaginate } from '@/utils/hooks';

import './ReportInventories.scss';
import { TGetInventorysParams } from '@/services/api';

const ReportInventories: React.FC = () => {
  const dispatch = useDispatch();
  const getReportInventoriesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetInventorysAction.GET_INVENTORYS],
  );
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;
  const ordersState = useSelector((state: TRootState) => state.reportInventoriesReducer.getInventorysResponse)?.data;
  const reportInventoriesState = useSelector(
    (state: TRootState) => state.reportInventoriesReducer.getInventorysResponse,
  )?.data;

  const [getReportInventoriesParamsRequest, setGetReportInventoriesParamsRequest] = useState<TGetInventorysParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });

  const {
    options: optionsCategories,
    handleLoadMore: handleLoadMoreCategories,
    handleSearch: handleSearchCategories,
  } = useOptionsPaginate(
    getCategoriesAction,
    'categoryReducer',
    'getCategoriesResponse',
    EGetCategoriesAction.GET_CATEGORIES,
    undefined,
    { auditingStatuses: EAuditingStatus.ACTIVE },
    { branchIds: currentBranchId },
  );

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
      keySort: 'name',
      className: 'limit-width',
      render: (_: string, record: TReportInventory): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.product?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.product?.id || EEmpty.DASH}
            </div>
            <div className="Table-info-description word-break-all ellipsis-2">
              {record?.product?.description || EEmpty.DASH}
            </div>
          </div>
        );
      },
    },
    {
      key: 'quantitysold',
      dataIndex: 'quantitySold',
      title: 'Số Lượng Đã Bán',
      width: 72,
      render: (value: string, record: TReportInventory): React.ReactElement => (
        <div className="Table-image">{record?.quantities_in_hand || EEmpty.DASH}</div>
      ),
    },
    {
      key: 'inventorynumber',
      dataIndex: 'inventoryNumber',
      title: 'Số Lượng Tồn Kho',
      width: 72,
      render: (value: string, record: TReportInventory): React.ReactElement => (
        <div className="Table-image">{record?.quantities_sold || EEmpty.DASH}</div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TReportInventory): React.ReactElement => {
        const status = dataProductStatusOptions.find((item) => item.value === record?.status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
  ];

  const getReportInventories = useCallback(() => {
    const categoryId = (getReportInventoriesParamsRequest?.categoryId as unknown as TSelectOption)?.value;
    const auditingStatuses = (getReportInventoriesParamsRequest?.auditingStatuses as unknown as TSelectOption)?.value;
    dispatch(
      getInventorysAction.request({
        params: {
          ...getReportInventoriesParamsRequest,
          categoryId,
          auditingStatuses: typeof auditingStatuses === 'number' ? auditingStatuses : EAuditingStatus.ACTIVE,
        },
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
          <Card className="ReportInventories-filter">
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
                    <Select
                      label="Danh mục"
                      placeholder="Chọn dữ liệu"
                      value={getReportInventoriesParamsRequest?.categoryId as any}
                      allowClear
                      showSearch
                      options={optionsCategories}
                      onLoadMore={handleLoadMoreCategories}
                      onSearch={handleSearchCategories}
                      onChange={(option): void => {
                        setGetReportInventoriesParamsRequest({
                          ...getReportInventoriesParamsRequest,
                          page: DEFAULT_PAGE,
                          categoryId: option as any,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Select
                      label="Trạng thái"
                      value={getReportInventoriesParamsRequest?.auditingStatuses as any}
                      onChange={(options): void => {
                        setGetReportInventoriesParamsRequest({
                          ...getReportInventoriesParamsRequest,
                          page: DEFAULT_PAGE,
                          auditingStatuses: options as any,
                        });
                      }}
                      allowClear
                      options={dataProductStatusOptions}
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
                      <strong>{ordersState?.total_elements || EEmpty.ZERO}</strong>
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
