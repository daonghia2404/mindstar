import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/Card';
import Select, { TSelectOption } from '@/components/Select';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataProductStatusOptions } from '@/common/constants';
import Input from '@/components/Input';
import { TRootState } from '@/redux/reducers';
import Table from '@/components/Table';
import Button, { EButtonStyleType } from '@/components/Button';
import { EAuditingStatus, EEmpty } from '@/common/enums';
import { EGetCategoriesAction, EGetProductsAction, getCategoriesAction, getProductsAction } from '@/redux/actions';
import { TProduct } from '@/common/models';
import { formatCurrency, getFullUrlStatics } from '@/utils/functions';
import DropdownMenu from '@/components/DropdownMenu';
import { TDropdownMenuItem } from '@/components/DropdownMenu/DropdownMenu.types';
import { TGetProductsParams } from '@/services/api';
import Avatar from '@/components/Avatar';
import ModalDeleteProduct from './ModalDeleteProduct';
import ModalProductForm from './ModalProductForm';
import Tags from '@/components/Tags';
import Status from '@/components/Status';
import { useOptionsPaginate } from '@/utils/hooks';

import './Products.scss';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const getProductsLoading = useSelector((state: TRootState) => state.loadingReducer[EGetProductsAction.GET_PRODUCTS]);
  const currentBranchId = useSelector((state: TRootState) => state.uiReducer.branch)?.id;

  const productsState = useSelector((state: TRootState) => state.productReducer.getProductsResponse)?.data;
  const [getProductsParamsRequest, setGetProductsParamsRequest] = useState<TGetProductsParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    auditingStatuses: `${EAuditingStatus.ACTIVE},${EAuditingStatus.INACTIVE}`,
  });
  const [modalProductsFormState, setModalProductFormState] = useState<{ visible: boolean; data?: TProduct }>({
    visible: false,
  });
  const [modalDeleteProductsState, setModalDeleteProductState] = useState<{ visible: boolean; data?: any }>({
    visible: false,
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

  const handleOpenModalProductForm = (data?: TProduct): void => {
    setModalProductFormState({ visible: true, data });
  };
  const handleCloseModalProductForm = (): void => {
    setModalProductFormState({ visible: false });
  };
  const handleOpenModalDeleteProduct = (data?: TProduct): void => {
    setModalDeleteProductState({ visible: true, data });
  };
  const handleCloseModalDeleteProduct = (): void => {
    setModalDeleteProductState({ visible: false });
  };

  const handlePaginationChange = (page: number, size: number, sort?: string): void => {
    setGetProductsParamsRequest({
      ...getProductsParamsRequest,
      page,
      size,
      sort,
    });
  };
  const handleSearch = (keyword?: string): void => {
    setGetProductsParamsRequest({
      ...getProductsParamsRequest,
      page: DEFAULT_PAGE,
      search: keyword,
    });
  };
  const dataTableDropdownActions = (data?: TProduct): TDropdownMenuItem[] => [
    {
      value: 'edit',
      label: 'Sửa',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenModalProductForm(data);
      },
    },
    {
      value: 'delete',
      label: 'Xoá',
      icon: EIconName.Trash,
      danger: true,
      onClick: (): void => {
        handleOpenModalDeleteProduct(data);
      },
    },
  ];
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
      render: (_: string, record: TProduct): React.ReactElement => {
        return (
          <div className="Table-info">
            <div className="Table-info-title">{record?.name || EEmpty.DASH}</div>
            <div className="Table-info-description" style={{ color: EIconColor.PURPLE_HEART }}>
              {record?.code || EEmpty.DASH}
            </div>
            <div className="Table-info-description word-break-all ellipsis-2">{record?.description || EEmpty.DASH}</div>
          </div>
        );
      },
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: 'Danh mục',
      className: 'limit-width',
      render: (_: string, record: TProduct): React.ReactElement =>
        record?.category ? (
          <Tags
            options={[
              {
                label: record.category.name,
                value: String(record.category.id),
                data: { iconName: EIconName.Category },
              },
            ]}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Giá',
      className: 'nowrap',
      sorter: true,
      keySort: 'selling_price',
      render: (_: string, record: TProduct): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{formatCurrency({ amount: record?.selling_price, showSuffix: true })}</div>
          {record?.retail_price && (
            <del className="Table-info-description">
              {formatCurrency({ amount: record?.retail_price, showSuffix: true })}
            </del>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'auditing_status',
      render: (_: string, record: TProduct): React.ReactElement => {
        const status = dataProductStatusOptions.find((item) => item.value === record.auditing_status);
        return status ? <Status label={status?.label} styleType={status?.data?.statusType} /> : <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      width: 40,
      render: (_: string, record: TProduct): React.ReactElement => (
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

  const getProducts = useCallback(() => {
    const categoryId = (getProductsParamsRequest?.categoryId as unknown as TSelectOption)?.value;
    const auditingStatuses = (getProductsParamsRequest?.auditingStatuses as unknown as TSelectOption)?.value;
    dispatch(
      getProductsAction.request({
        params: {
          ...getProductsParamsRequest,
          categoryId,
          auditingStatuses: typeof auditingStatuses === 'number' ? auditingStatuses : EAuditingStatus.ACTIVE,
        },
        headers: { branchIds: currentBranchId },
      }),
    );
  }, [dispatch, getProductsParamsRequest, currentBranchId]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="Products">
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
                  <Col>
                    <Select
                      label="Danh mục"
                      placeholder="Chọn dữ liệu"
                      value={getProductsParamsRequest?.categoryId as any}
                      allowClear
                      showSearch
                      options={optionsCategories}
                      onLoadMore={handleLoadMoreCategories}
                      onSearch={handleSearchCategories}
                      onChange={(option): void => {
                        setGetProductsParamsRequest({
                          ...getProductsParamsRequest,
                          page: DEFAULT_PAGE,
                          categoryId: option as any,
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Select
                      label="Trạng thái"
                      value={getProductsParamsRequest?.auditingStatuses as any}
                      onChange={(options): void => {
                        setGetProductsParamsRequest({
                          ...getProductsParamsRequest,
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
          <Card className="Products-table">
            <Table
              header={
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                  <Col>
                    <div className="Table-total-item">
                      <Icon name={EIconName.BoxSeam} color={EIconColor.TUNDORA} />
                      Tổng Sản Phẩm: <strong>{productsState?.total_elements || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                  <Col>
                    <Button
                      title="Tạo mới Sản Phẩm"
                      styleType={EButtonStyleType.PURPLE}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenModalProductForm}
                    />
                  </Col>
                </Row>
              }
              loading={getProductsLoading}
              columns={columns}
              dataSources={productsState?.content || []}
              page={getProductsParamsRequest.page}
              pageSize={getProductsParamsRequest.size}
              total={productsState?.total_elements}
              onPaginationChange={handlePaginationChange}
            />
          </Card>
        </Col>
      </Row>
      <ModalProductForm {...modalProductsFormState} onClose={handleCloseModalProductForm} onSuccess={getProducts} />
      <ModalDeleteProduct
        {...modalDeleteProductsState}
        onClose={handleCloseModalDeleteProduct}
        onSuccess={getProducts}
      />
    </div>
  );
};

export default Products;
